import { FlatList, View } from "react-native";
import { Product } from "../../../domain/entities/product";
import AppText from "../../components/atoms/AppText";
import IconButton from "../../components/atoms/IconButton";
import AppTextInput from "../../components/molecules/AppTextInput";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";
import SellDetailRenderItem from "../../components/organism/SellDetailRenderItem";

type Props = {
  products: Product[];
  showSearchBar: boolean;
  search: string;
  setSearch: (search: string) => void;
  setShowSearchBar: (showSearchBar: boolean) => void;
  onPress: (item: Product | undefined) => void;
};

const ProductsScreen = (props: Props) => {
  return (
    <Animatable.View
      animation={"fadeInRight"}
      duration={100}
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 65,
        backgroundColor: COLORS.whiteSmoke,
      }}
    >
      <AppText
        type="medium"
        style={{ marginBottom: 25, fontSize: 35 }}
        children="Productos"
      />

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 60,
        }}
      >
        <View style={{ flex: 12 }}>
          <IconButton
            iconName="book-search-outline"
            label="Buscar"
            onPress={() => props.setShowSearchBar(!props.showSearchBar)}
          />
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ flex: 12 }}>
          <IconButton
            iconName="plus-circle-outline"
            label="Crear"
            onPress={() => props.onPress(undefined)}
          />
        </View>
      </View>

      {props.showSearchBar && (
        <Animatable.View animation={"fadeInDown"} duration={100}>
          <AppTextInput
            onChangeText={props.setSearch}
            placeholder="Buscar codigo - nombre"
            value={props.search}
            theme="light"
          />
        </Animatable.View>
      )}

      <View style={{ marginVertical: "1.5%" }} />

      {props.products.length === 0 && (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Ionicons
            name="warning-outline"
            size={16}
            color={COLORS.orangeWarning}
          />

          <View style={{ width: 5 }} />

          <AppText
            type="medium"
            style={{ fontSize: 16 }}
            children="No hay productos para mostrar"
            numberOfLines={1}
          />
        </View>
      )}

      <FlatList
        data={props.products}
        renderItem={({ item, index }) => (
          <SellDetailRenderItem
            item={item}
            index={index}
            onPress={() => props.onPress(item)}
          />
        )}
      />
    </Animatable.View>
  );
};

export default ProductsScreen;
