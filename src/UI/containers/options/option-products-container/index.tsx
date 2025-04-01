import { useState } from "react";
import { Product } from "../../../../domain/entities/product";
import CreateEditProduct from "../../../components/organism/CreateEditProduct";
import OptionProductsScreen from "../../../screens/options/option-products-screen";
import { Category } from "../../../../domain/entities/category";

type Props = {
  onBackPress: () => void;
};

const OptionProductsContainer = (props: Props) => {
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

  const onCreateOrEditProduct = () => {
    setSelectedCategory(undefined);
    setSelectedProduct(undefined);
    setShowProductEditOrCreate(false);
  };

  if (showProductEditOrCreate)
    return (
      <CreateEditProduct
        product={selectedProduct}
        onSelectCategory={setSelectedCategory}
        onCreateOrEditProduct={onCreateOrEditProduct}
      />
    );

  return (
    <OptionProductsScreen
      setShowSearchBar={setShowSearchBar}
      showSearchBar={showSearchBar}
      onPress={onPress}
      onBackPress={props.onBackPress}
    />
  );
};

export default OptionProductsContainer;
