import { View } from "react-native";
import { useEffect, useState } from "react";
import AppText from "../../atoms/AppText";
import AppTextInput from "../../molecules/AppTextInput";
import AppButton from "../../molecules/AppButton";
import { Product } from "../../../../domain/entities/product";
import AppCategoriesDropDown from "../../molecules/AppCategoriesDropDown";
import { Category } from "../../../../domain/entities/category";
import { BarcodeScanningResult, CameraView } from "expo-camera";

type Props = {
  product: Product | undefined;
  scanned: string;
  categories: Category[];
  handleScan: () => void;
  onCreateOrEditProduct: (product: Product) => void;
  handleBarcodeScanned: (data: BarcodeScanningResult) => void;
};

const defaultProduct: Product = {
  id: "",
  name: "",
  price: 0,
  code: "",
  category_id: "",
  companyid: "",
  active: true,
};

const CreateEditProduct = (props: Props) => {
  const product = props.product;

  const [createdOrEditedProduct, setCreatedOrEditedProduct] =
    useState<Product>(defaultProduct);

  const handleAutoCompleteProduct = () => {
    if (product && createdOrEditedProduct === defaultProduct) {
      setCreatedOrEditedProduct(product);
    }
  };

  useEffect(handleAutoCompleteProduct, [product]);

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <AppText
        type="medium"
        style={{ fontSize: 20 }}
        children={!props.product ? "Crear producto" : "Editar producto"}
      />

      <View style={{ marginVertical: "1.5%" }} />

      <AppTextInput
        onChangeText={(text) =>
          setCreatedOrEditedProduct({ ...createdOrEditedProduct, name: text })
        }
        placeholder="Nombre del producto"
        value={createdOrEditedProduct.name}
        theme="light"
        keyboardType="default"
      />

      <View style={{ marginVertical: "1.5%" }} />

      <View
        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
      >
        <View style={{ width: "50%" }}>
          <AppTextInput
            onChangeText={(text) =>
              setCreatedOrEditedProduct({
                ...createdOrEditedProduct,
                code: text,
              })
            }
            placeholder="Código del producto"
            value={createdOrEditedProduct.code.toString()}
            theme="light"
            keyboardType="numeric"
          />
        </View>

        <View style={{ marginHorizontal: "2%" }} />

        <View style={{ width: "45%" }}>
          <AppTextInput
            onChangeText={(text) =>
              setCreatedOrEditedProduct({
                ...createdOrEditedProduct,
                price: parseFloat(text) || 0,
              })
            }
            placeholder="Precio del producto"
            value={createdOrEditedProduct.price.toString()}
            theme="light"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ marginVertical: "1.5%" }} />

      <AppCategoriesDropDown
        data={props.categories}
        currentCategoryId={createdOrEditedProduct.category_id}
        onSelect={(category) =>
          setCreatedOrEditedProduct({
            ...createdOrEditedProduct,
            category_id: category.id,
          })
        }
      />

      <View style={{ marginVertical: "5%" }} />

      <AppButton
        label="Aceptar"
        alignCenter={true}
        onPress={() => props.onCreateOrEditProduct(createdOrEditedProduct)}
      />
    </View>
  );
};

export default CreateEditProduct;
