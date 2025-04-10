import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "../../atoms/AppText";
import AppTextInput from "../../molecules/AppTextInput";
import AppButton from "../../molecules/AppButton";
import { Product } from "../../../../domain/entities/product";
import AppCategoriesDropDown from "../../molecules/AppCategoriesDropDown";
import { Category } from "../../../../domain/entities/category";
import { BarcodeScanningResult, CameraView } from "expo-camera";
import { COLORS } from "../../../styles/colors";
import AppModal from "../../molecules/AppModal";

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

  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  const handleAutoCompleteProduct = () => {
    if (product && createdOrEditedProduct === defaultProduct) {
      setCreatedOrEditedProduct(product);
    }
  };

  useEffect(handleAutoCompleteProduct, [product]);

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <AppText
        type="bold"
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
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: COLORS.white,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: COLORS.gray,
              padding: 14,
            }}
            onPress={() => setShowBarcodeScanner(true)}
            activeOpacity={0.8}
          >
            <AppText
              style={{ fontSize: 16 }}
              type="medium"
              numberOfLines={1}
              children={
                createdOrEditedProduct.code.length > 0
                  ? createdOrEditedProduct.code
                  : "Escanear código"
              }
            />
          </TouchableOpacity>
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
        onPress={() => props.onCreateOrEditProduct(createdOrEditedProduct)}
      />

      <AppModal
        visible={showBarcodeScanner}
        onClose={() => setShowBarcodeScanner(false)}
      >
        <View style={{ flex: 5 }}>
          <CameraView
            onBarcodeScanned={props.handleBarcodeScanned}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View
          style={{
            flex: 2,
            marginTop: 40,
          }}
        >
          <AppButton
            label="Escanear"
            onPress={() => {
              setShowBarcodeScanner(false);
              setCreatedOrEditedProduct({
                ...createdOrEditedProduct,
                code: props.scanned,
              });
              props.handleScan();
            }}
          />
        </View>
      </AppModal>
    </View>
  );
};

export default CreateEditProduct;
