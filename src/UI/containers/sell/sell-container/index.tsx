import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Linking, Platform } from "react-native";
import { Camera, BarcodeScanningResult } from "expo-camera";
import { Audio } from "expo-av";

import SellScreen from "../../../screens/sell/sell-screen";
import EditAmountModal from "../../../components/organism/SellEditAmountModal";

import { Product } from "../../../../domain/entities/product";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductService } from "../../../../infrastructure/services/product-service";
import { Detail } from "../../../../domain/entities/sell-summary";
import { useFocusEffect } from "@react-navigation/native";

type Props = {
  changeStep: (total: number, products: Detail[]) => void;
  context: {
    products: Detail[] | undefined;
  };
};

export type SellProduct = Product & {
  multiplier: number;
};

const SellContainer = (props: Props) => {
  const [hasPersmissions, setHasPermissions] = useState(false);
  const [scannedProducts, setScannedProducts] = useState<Detail[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Detail | null>(null);
  const [total, setTotal] = useState(0);
  const [scanned, setScanned] = useState("");
  const [products, setProducts] = useState<Product[]>();
  const [showEditModal, setShowEditModal] = useState(false);

  const sound = useRef<Audio.Sound | null>(null);
  const lastScannedCodeRef = useRef<string | null>(null);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log("Camera permission status:", status);

    setHasPermissions(status === "granted");
  };

  const sendUserToSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
      return;
    }

    Linking.openSettings();
  };

  const playSound = async () => {
    if (sound.current) await sound.current.replayAsync();
  };

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (!scanned && lastScannedCodeRef.current !== data) {
      setScanned(data);
    }
  };

  const handleAddNewProductToList = (product: Product) => {
    const detailProduct: Detail = {
      id: product.id,
      code: product.code,
      name: product.name,
      unit_price: product.price,
      category: product.category_id,
      quantity: 1,
      productid: product.id,
      sellid: "",
      total: product.price,
    };

    const newList: Detail[] = [detailProduct, ...scannedProducts];
    setScannedProducts(newList);
    cleanScannerProcess();
  };

  const handleUpdateProductInList = (
    product: Detail,
    multiplierNumber?: number
  ) => {
    const updatedItem = {
      ...product,
      quantity: multiplierNumber ?? product.quantity + 1,
    };

    const updatedList = [
      updatedItem,
      ...scannedProducts.filter((item) => item.code !== product.code),
    ];

    setScannedProducts(updatedList);
    cleanScannerProcess();
  };

  const addProductToList = async () => {
    if (!scanned || !products) return;

    const scannedProduct = products.find((p) => p.code === scanned);
    if (!scannedProduct) return;

    const productInList = scannedProducts.find(
      (p) => p.code === scannedProduct.code
    );

    if (!productInList) {
      handleAddNewProductToList(scannedProduct);
    } else {
      handleUpdateProductInList(productInList);
    }

    await playSound();
  };

  const editProductInList = (index: number) => {
    setSelectedProduct(scannedProducts[index]);
    setShowEditModal(true);
  };

  const removeProductFromList = (index: number) => {
    const newProducts = [...scannedProducts];
    newProducts.splice(index, 1);
    setScannedProducts(newProducts);
    cleanScannerProcess();
  };

  const productService = new ProductService();

  const handleGetAllProducts = async () => {
    const strUser = await AsyncStorage.getItem("user");
    const user = strUser ? JSON.parse(strUser) : undefined;

    if (!user) return;

    const companyId = user.companyid;
    const response = (await productService.findAll(companyId)) as Product[];

    setProducts(response);

    const boilerplateSell: Detail = {
      category: response[0].category_id,
      code: response[0].code,
      name: response[0].name,
      unit_price: response[0].price,
      quantity: 1,
      total: response[0].price,
      sellid: "",
      productid: response[0].id,
    };

    setScannedProducts([boilerplateSell]);
  };

  const handleDeleteProductFromSell = (index: number) => {
    Alert.alert(
      "Eliminar producto",
      "¿Está seguro de eliminar este producto de la venta?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Aceptar", onPress: () => removeProductFromList(index) },
      ]
    );
  };

  const handleCancelSell = () => {
    Alert.alert("Cancelar venta", "¿Está seguro de cancelar la venta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Aceptar",
        onPress: () => {
          setScannedProducts([]);
          cleanScannerProcess();
        },
      },
    ]);
  };

  const handleCalculateTotal = () => {
    const sellTotal = scannedProducts.reduce(
      (acc, product) => acc + product.unit_price * product.quantity,
      0
    );
    setTotal(sellTotal);
  };

  const cleanScannerProcess = () => {
    setScanned("");
    lastScannedCodeRef.current = scanned;
  };

  const changeStep = () => {
    props.changeStep(total, scannedProducts);
  };

  const loadSound = async () => {
    const soundRoute = require("../../../../../assets/sounds/scanner-sound.wav");
    const { sound: soundObject } = await Audio.Sound.createAsync(soundRoute);
    sound.current = soundObject;
  };

  const unloadSound = async () => {
    if (sound.current) await sound.current.unloadAsync();
  };

  const initComponent = async () => {
    handleGetAllProducts();
    getCameraPermissions();
    loadSound();

    const contextProducts = props.context.products;
    if (contextProducts) setScannedProducts(contextProducts);

    return async () => {
      await unloadSound();
    };
  };

  useEffect(() => {
    setTimeout(cleanScannerProcess, 1000);
  }, [lastScannedCodeRef.current]);

  useEffect(() => {
    handleCalculateTotal();
  }, [scannedProducts]);

  useEffect(() => {
    initComponent();
  }, []);

  useFocusEffect(
    useCallback(() => {
      initComponent();
    }, [])
  );

  return (
    <>
      <SellScreen
        handleBarcodeScanned={handleBarCodeScanned}
        hasPermission={hasPersmissions}
        editProductInList={editProductInList}
        removeProductFromList={handleDeleteProductFromSell}
        scan={addProductToList}
        products={scannedProducts}
        requestCameraPermission={sendUserToSettings}
        cancelSell={() => {
          if (scannedProducts.length > 0) handleCancelSell();
        }}
        total={total}
        changeStep={changeStep}
      />

      <EditAmountModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        selectedProduct={selectedProduct}
        onPressAccept={(multiplier) => {
          if (selectedProduct) {
            handleUpdateProductInList(selectedProduct, multiplier);
          }
        }}
      />
    </>
  );
};

export default SellContainer;
