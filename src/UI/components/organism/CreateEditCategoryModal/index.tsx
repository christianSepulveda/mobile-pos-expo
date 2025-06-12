import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AppModal from "../../molecules/AppModal";
import AppText from "../../atoms/AppText";
import { Category } from "../../../../domain/entities/category";
import AppTextInput from "../../molecules/AppTextInput";
import AppButton from "../../molecules/AppButton";

type Props = {
  visible: boolean;
  onClose: () => void;
  category: Category | undefined;
  onPress: (category: Category) => void;
};

const CreateEditCategoryModal = (props: Props) => {
  const [categoryName, setCategoryName] = useState("");

  const handleAutoCompleteCategoryName = () => {
    if (props.category && categoryName.length === 0) {
      setCategoryName(props.category.name);
    }
  };

  useEffect(handleAutoCompleteCategoryName, [props.category]);

  return (
    <AppModal
      visible={props.visible}
      onClose={() => {
        props.onClose();
        setCategoryName("");
      }}
    >
      <AppText
        children={props.category ? "Editar categoría" : "Crear categoría"}
        type="medium"
        style={{ fontSize: 20, marginBottom: 20 }}
      />

      <AppTextInput
        placeholder="Nombre de la categoría"
        onChangeText={setCategoryName}
        value={categoryName}
        theme="light"
      />

      <View style={{ height: 20 }} />

      <AppButton
        label="Aceptar"
        alignCenter={true}
        onPress={() => {
          setCategoryName("");
          const createdOrUpdatedCategory: Category = {
            id: props.category ? props.category.id : "",
            name: categoryName,
            companyid: props.category?.companyid || "",
            active: true,
          };

          props.onPress(createdOrUpdatedCategory);
        }}
      />
    </AppModal>
  );
};

export default CreateEditCategoryModal;
