import { View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../../styles/colors";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { Product } from "../../../../domain/entities/product";
import AppText from "../../../components/atoms/AppText";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const productList: Product[] = [
  {
    id: "1",
    name: "Producto 1",
    price: 100,
    code: "123",
    category_id: "1",
    active: true,
  },
  {
    id: "2",
    name: "Producto 2",
    price: 200,
    code: "124",
    category_id: "1",
    active: true,
  },
  {
    id: "3",
    name: "Producto 3",
    price: 300,
    code: "125",
    category_id: "1",
    active: true,
  },
  {
    id: "4",
    name: "Producto 4",
    price: 400,
    code: "126",
    category_id: "1",
    active: true,
  },
  {
    id: "5",
    name: "Producto 5",
    price: 500,
    code: "127",
    category_id: "1",
    active: true,
  },
  {
    id: "6",
    name: "Producto 6",
    price: 600,
    code: "128",
    category_id: "1",
    active: true,
  },
  {
    id: "7",
    name: "Producto 7",
    price: 700,
    code: "129",
    category_id: "1",
    active: true,
  },
  {
    id: "8",
    name: "Producto 8",
    price: 800,
    code: "130",
    category_id: "1",
    active: true,
  },
  {
    id: "9",
    name: "Producto 9",
    price: 900,
    code: "131",
    category_id: "1",
    active: true,
  },
  {
    id: "10",
    name: "Producto 10",
    price: 1000,
    code: "132",
    category_id: "1",
    active: true,
  },
];

const ProductListContainer = (props: Props) => {
  const RenderItem = ({ item, index }: { item: Product; index: number }) => (
    <View
      style={{
        padding: "5%",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: index === productList.length - 1 ? 0 : 1,
        borderBottomColor: COLORS.grayDark,
      }}
    >
      <View style={{ flex: 10 }}>
        <AppText
          style={{ fontSize: 18, color: COLORS.whiteSmoke, marginBottom: 10 }}
          type="semiBold"
          children={item.name}
        />
        <AppText
          style={{ fontSize: 14, color: COLORS.grayDark }}
          type="medium"
          children={item.code}
        />
      </View>

      <AppText
        style={{ fontSize: 18, color: COLORS.purpleIndigo, flex: 2 }}
        type="bold"
        children={`$${item.price.toString()}`}
      />
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.blackIOS,
        paddingTop: "20%",
        paddingHorizontal: "5%",
      }}
    >
      <StatusBar translucent style="light" />

      <AppTextInput
        placeholder="Busca un producto - código - precio"
        onChangeText={() => {}}
        value=""
        searchBar
      />

      <View style={{ marginTop: "5%" }} />

      <FlatList
        data={productList}
        renderItem={(props) => (
          <RenderItem item={props.item} index={props.index} />
        )}
      />
    </View>
  );
};

export default ProductListContainer;
