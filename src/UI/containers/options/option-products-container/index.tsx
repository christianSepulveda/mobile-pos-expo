import { useEffect, useRef, useState } from "react";
import { Product } from "../../../../domain/entities/product";
import CreateEditProduct from "../../../components/organism/CreateEditProduct";
import OptionProductsScreen from "../../../screens/options/option-products-screen";
import { Category } from "../../../../domain/entities/category";
import { ProductService } from "../../../../infrastructure/services/product-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CategoryService } from "../../../../infrastructure/services/category-service";
import { Alert } from "react-native";
import { Audio } from "expo-av";
import { BarcodeScanningResult, Camera } from "expo-camera";

type Props = {
  onBackPress: () => void;
};

const OptionProductsContainer = (props: Props) => {
  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [hasPersmissions, setHasPermissions] = useState(false);
  const [scanned, setScanned] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companyId, setCompanyId] = useState<string>("");

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [showProductEditOrCreate, setShowProductEditOrCreate] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const sound = useRef<Audio.Sound | null>(null);
  const lastScannedCodeRef = useRef<string | null>(null);

  const getCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermissions(status === "granted");
  };

  const playSound = async () => {
    if (sound.current) await sound.current.replayAsync();
  };

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    if (!scanned && lastScannedCodeRef.current !== data) {
      setScanned(data);
    }
  };

  const cleanScannerProcess = () => {
    setScanned("");
    lastScannedCodeRef.current = scanned;
  };

  const onPress = (item: Product | undefined) => {
    setSelectedProduct(item);
    setShowProductEditOrCreate(true);
  };

  const validateProduct = (product: Product) => {
    if (product.name.length === 0) {
      Alert.alert("Error", "El nombre del producto no puede estar vacío");
      return false;
    }

    if (product.code.length === 0) {
      Alert.alert("Error", "El codigo del producto no puede estar vacío");
      return false;
    }

    if (product.price <= 0) {
      Alert.alert("Error", "El precio del producto debe ser mayor a 0");
      return false;
    }

    if (product.category_id.length === 0) {
      Alert.alert("Error", "La categoría del producto no puede estar vacía");
      return false;
    }

    return true;
  };

  const onCreateOrEditProduct = async (product: Product) => {
    if (!validateProduct(product)) return;

    const isNewProduct = product.id.length === 0;
    if (isNewProduct) await productService.save(product, companyId);
    if (!isNewProduct) await productService.update(product, companyId);

    await getProducts();

    setSelectedProduct(undefined);
    setShowProductEditOrCreate(false);
  };

  const getProducts = async () => {
    const user = await AsyncStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    const companyid = parsedUser?.companyid;
    if (!companyid) return;

    const products = await productService.findAll(companyid);
    setCompanyId(companyid);
    setProducts(products as Product[]);
    setFilteredProducts(products as Product[]);
    await getCategories(companyid);
  };

  const getCategories = async (companyId: string) => {
    const response = await categoryService.findAll(companyId);
    setCategories(response as Category[]);
  };

  const onSearch = () => {
    if (search.length === 0) setFilteredProducts(products);

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.code.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const handleScan = async () => {
    if (scanned) {
      cleanScannerProcess();
      await playSound();
    }
  };

  const loadSound = async () => {
    const soundRoute = require("../../../../../assets/sounds/scanner-sound.wav");
    const { sound: soundObject } = await Audio.Sound.createAsync(soundRoute);
    sound.current = soundObject;
  };

  const unloadSound = async () => {
    if (sound.current) await sound.current.unloadAsync();
  };

  useEffect(() => {
    onSearch();
  }, [search]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    loadSound();
    getCameraPermissions();

    return () => {
      unloadSound();
    };
  }, []);

  if (showProductEditOrCreate)
    return (
      <CreateEditProduct
        product={selectedProduct}
        scanned={scanned}
        handleScan={handleScan}
        handleBarcodeScanned={handleBarCodeScanned}
        onCreateOrEditProduct={onCreateOrEditProduct}
        categories={categories}
      />
    );

  return (
    <OptionProductsScreen
      products={filteredProducts}
      search={search}
      setSearch={setSearch}
      setShowSearchBar={setShowSearchBar}
      showSearchBar={showSearchBar}
      onPress={onPress}
      onBackPress={props.onBackPress}
    />
  );
};

export default OptionProductsContainer;
