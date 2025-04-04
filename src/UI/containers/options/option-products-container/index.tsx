import { useEffect, useState } from "react";
import { Product } from "../../../../domain/entities/product";
import CreateEditProduct from "../../../components/organism/CreateEditProduct";
import OptionProductsScreen from "../../../screens/options/option-products-screen";
import { Category } from "../../../../domain/entities/category";
import { ProductService } from "../../../../infrastructure/services/product-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CategoryService } from "../../../../infrastructure/services/category-service";
import { Alert } from "react-native";

type Props = {
  onBackPress: () => void;
};

const OptionProductsContainer = (props: Props) => {
  const productService = new ProductService();
  const categoryService = new CategoryService();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companyId, setCompanyId] = useState<string>("");

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const [showProductEditOrCreate, setShowProductEditOrCreate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

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

    setSelectedCategory(undefined);
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
    await getCategories(companyid);
  };

  const getCategories = async (companyId: string) => {
    const response = await categoryService.findAll(companyId);
    setCategories(response as Category[]);
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (showProductEditOrCreate)
    return (
      <CreateEditProduct
        product={selectedProduct}
        onSelectCategory={setSelectedCategory}
        onCreateOrEditProduct={onCreateOrEditProduct}
        categories={categories}
      />
    );

  return (
    <OptionProductsScreen
      products={products}
      setShowSearchBar={setShowSearchBar}
      showSearchBar={showSearchBar}
      onPress={onPress}
      onBackPress={props.onBackPress}
    />
  );
};

export default OptionProductsContainer;
