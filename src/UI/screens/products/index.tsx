import { FlatList, View } from "react-native";
import { Product } from "../../../domain/entities/product";
import AppText from "../../components/atoms/AppText";
import IconButton from "../../components/atoms/IconButton";
import AppTextInput from "../../components/molecules/AppTextInput";
import OptionProductRenderItem from "../../components/organism/OptionProductRenderItem";

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
    <View style={{ flex: 1, padding: 20, paddingTop: 70 }}>
      <AppText
        type="bold"
        style={{ fontSize: 30 }}
        children="Productos"
        numberOfLines={1}
      />

      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          width: "100%",
          height: 60,
        }}
      >
        <View style={{ flex: 12 }}>
          <IconButton
            iconName="book-search"
            label="Buscar"
            onPress={() => props.setShowSearchBar(!props.showSearchBar)}
          />
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ flex: 12 }}>
          <IconButton
            iconName="plus-circle"
            label="Crear"
            onPress={() => props.onPress(undefined)}
          />
        </View>
      </View>

      {props.showSearchBar && (
        <AppTextInput
          onChangeText={props.setSearch}
          placeholder="Buscar codigo - nombre"
          value={props.search}
          theme="light"
        />
      )}

      <View style={{ marginVertical: "1.5%" }} />

      {props.products.length === 0 && (
        <AppText
          type="bold"
          style={{ fontSize: 16 }}
          children="Crea un producto para continuar"
          numberOfLines={1}
        />
      )}

      <FlatList
        data={props.products}
        renderItem={(item) => (
          <OptionProductRenderItem
            index={item.index}
            item={item.item}
            onPress={props.onPress}
          />
        )}
      />
    </View>
  );
};

export default ProductsScreen;
