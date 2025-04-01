import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Category } from "../../../../domain/entities/category";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";

type Props = {
  data: Category[];
  currentCategoryId?: string;
  onSelect: (category: Category) => void;
};

const AppCategoriesDropDown = (props: Props) => {
  const [category, setCategory] = useState<Category>();

  const handleAutoSelectCategory = () => {
    if (props.currentCategoryId) {
      const currentCategory = props.data.filter(
        (item) => item.id === props.currentCategoryId
      )[0];

      setCategory(currentCategory);
    }
  };

  useEffect(handleAutoSelectCategory, [props.currentCategoryId]);

  const renderItem = (item: Category, selected?: boolean) => {
    return (
      <View style={styles.item}>
        <AppText
          type={item === category ? "bold" : "medium"}
          style={{
            ...styles.textItem,
            color: item === category ? COLORS.blueIOS : COLORS.blackIOS,
          }}
        >
          {item.name}
        </AppText>
        {item === category && (
          <AntDesign
            style={styles.icon}
            color={COLORS.blueIOS}
            name="checkcircle"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={props.data}
      search
      maxHeight={300}
      labelField="name"
      valueField="id"
      placeholder="Seleccione una categoría"
      searchPlaceholder="Buscar..."
      value={category}
      onChange={(category) => {
        setCategory(category.name);
        props.onSelect(category);
      }}
      renderItem={renderItem}
    />
  );
};

export default AppCategoriesDropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.blackIOS,
    fontFamily: "Quicksand_500Medium",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
