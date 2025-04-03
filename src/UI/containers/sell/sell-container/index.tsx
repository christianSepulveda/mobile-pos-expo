import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { Camera, BarcodeScanningResult } from "expo-camera";

import SellScreen from "../../../screens/sell/sell-screen";
import EditAmountModal from "../../../components/organism/SellEditAmountModal";

import { Product } from "../../../../domain/entities/product";
import { Products } from "../../../../domain/constants/data";

type Props = {
  changeStep: (total: number, products: SellProduct[]) => void;
  context: {
    products: SellProduct[] | undefined;
  };
};

export type SellProduct = Product & {
  multiplier: number;
};

const SellContainer = (props: Props) => {
  const [hasPersmissions, setHasPermissions] = useState(false);
  const [scannedProducts, setScannedProducts] = useState<SellProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SellProduct | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [scanned, setScanned] = useState("");
  const [total, setTotal] = useState(0);

  const lastScannedCodeRef = useRef<string | null>(null);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermissions(status === "granted");
  };

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (!scanned && lastScannedCodeRef.current !== data) {
      setScanned(data);
    }
  };

  const handleAddNewProductToList = (product: Product) => {
    const newList = [{ ...product, multiplier: 1 }, ...scannedProducts];
    setScannedProducts(newList);
    resetScanState();
  };

  const handleUpdateProductInList = (
    product: SellProduct,
    multiplierNumber?: number
  ) => {
    const updatedItem = {
      ...product,
      multiplier: multiplierNumber ?? product.multiplier + 1,
    };

    const updatedList = [
      updatedItem,
      ...scannedProducts.filter((item) => item.code !== product.code),
    ];

    setScannedProducts(updatedList);
    resetScanState();
  };

  const addProductToList = () => {
    if (!scanned) return;

    const scannedProduct = Products.find((p) => p.code === scanned);
    if (!scannedProduct) return;

    const productInList = scannedProducts.find((p) => p.code === scanned);

    if (!productInList) {
      handleAddNewProductToList(scannedProduct);
    } else {
      handleUpdateProductInList(productInList);
    }
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
      (acc, product) => acc + product.price * product.multiplier,
      0
    );
    setTotal(sellTotal);
  };

  const resetScanState = () => {
    setScanned("");
    lastScannedCodeRef.current = scanned;
  };

  const cleanScannerProcess = () => {
    setScanned("");
    lastScannedCodeRef.current = null;
  };

  const changeStep = () => {
    props.changeStep(total, scannedProducts);
  };

  useEffect(() => {
    setTimeout(cleanScannerProcess, 1000);
  }, [lastScannedCodeRef.current]);

  useEffect(() => {
    /*  if (scannedProducts.length === 0)
      handleUpdateProductInList({ ...Products[0], multiplier: 1 }, 3);
     */
    handleCalculateTotal();
  }, [scannedProducts]);

  useEffect(() => {
    const contextProducts = props.context.products;
    if (contextProducts) setScannedProducts(contextProducts);

    getCameraPermissions();
  }, []);

  return (
    <>
      <SellScreen
        handleBarcodeScanned={handleBarCodeScanned}
        hasPermission={hasPersmissions}
        editProductInList={editProductInList}
        removeProductFromList={handleDeleteProductFromSell}
        scan={addProductToList}
        products={scannedProducts}
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
