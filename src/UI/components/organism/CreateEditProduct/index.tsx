import { View } from "react-native";
import React, { useEffect, useState } from "react";
import AppText from "../../atoms/AppText";
import AppTextInput from "../../molecules/AppTextInput";
import AppButton from "../../molecules/AppButton";
import { Product } from "../../../../domain/entities/product";
import AppCategoriesDropDown from "../../molecules/AppCategoriesDropDown";
import { Categories } from "../../../../domain/constants/data";
import { Category } from "../../../../domain/entities/category";

type Props = {
  product: Product | undefined;
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  onCreateOrEditProduct: (product: Product) => void;
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
    <View style={{ flex: 1, padding: "8%", paddingTop: 70 }}>
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

      <View style={{ flexDirection: "row", width: "100%" }}>
        <View style={{ width: "50%" }}>
          <AppTextInput
            onChangeText={(text) =>
              setCreatedOrEditedProduct({
                ...createdOrEditedProduct,
                code: text,
              })
            }
            placeholder="Codigo del producto"
            value={createdOrEditedProduct.code}
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
        onPress={() => props.onCreateOrEditProduct(createdOrEditedProduct)}
      />
    </View>
  );
};

export default CreateEditProduct;
