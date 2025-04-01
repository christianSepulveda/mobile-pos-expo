import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import IconButton from "../../../components/atoms/IconButton";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { Categories } from "../../../../domain/constants/data";
import { Category } from "../../../../domain/entities/category";

type Props = {
  showSearchBar: boolean;
  setShowSearchBar: (showSearchBar: boolean) => void;
  onPress: (item: Category | undefined) => void;
  onBackPress: () => void;
};

type OptionCategoriesItemProps = {
  item: Category;
  index: number;
};

const OptionCategoriesScreen = (props: Props) => {
  const OptionCategoriesRenderItem = (itemProps: OptionCategoriesItemProps) => (
    <TouchableOpacity
      style={{
        padding: 15,
        paddingVertical: 20,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
      }}
      onPress={() => props.onPress(itemProps.item)}
      activeOpacity={0.8}
    >
      <AppText
        type="bold"
        style={{ fontSize: 20 }}
        children={itemProps.item.name}
        numberOfLines={1}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 70 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={props.onBackPress}>
          <Ionicons name="chevron-back" color={COLORS.blueIOS} size={40} />
        </TouchableOpacity>

        <AppText
          type="bold"
          style={{ fontSize: 30 }}
          children="Categorías"
          numberOfLines={1}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          width: "100%",
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "45%" }}>
          <IconButton
            iconName="book-search"
            label="Buscar"
            onPress={() => props.setShowSearchBar(!props.showSearchBar)}
          />
        </View>

        <View style={{ width: "5%" }} />

        <View style={{ width: "45%" }}>
          <IconButton
            iconName="plus-circle"
            label="Crear"
            onPress={() => props.onPress(undefined)}
          />
        </View>
      </View>

      {props.showSearchBar && (
        <AppTextInput
          onChangeText={() => {}}
          placeholder="Busca una categoría"
          value=""
          theme="light"
        />
      )}

      <View style={{ marginVertical: "1.5%" }} />

      <FlatList
        data={Categories}
        renderItem={(item) => <OptionCategoriesRenderItem {...item} />}
      />
    </View>
  );
};

export default OptionCategoriesScreen;
