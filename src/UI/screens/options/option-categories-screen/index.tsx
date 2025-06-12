import {
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import IconButton from "../../../components/atoms/IconButton";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { Category } from "../../../../domain/entities/category";
import AppIndicator from "../../../components/molecules/AppIndicator";
import * as Animatable from "react-native-animatable";

type Props = {
  search: string;
  categories: Category[];
  showSearchBar: boolean;
  loading: boolean;

  onBackPress: () => void;
  setSearch: (search: string) => void;
  onPress: (item: Category | undefined) => void;
  setShowSearchBar: (showSearchBar: boolean) => void;
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
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => props.onPress(itemProps.item)}
      activeOpacity={0.8}
    >
      <Ionicons name="book-outline" size={18} color={COLORS.blueIOS} />

      <View style={{ marginEnd: 10 }} />

      <AppText
        type="medium"
        style={{ fontSize: 18 }}
        children={itemProps.item.name}
        numberOfLines={1}
      />
    </TouchableOpacity>
  );

  return (
    <Animatable.View
      animation={"fadeInRight"}
      duration={100}
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: COLORS.whiteSmoke,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={props.onBackPress}
          style={{ flexDirection: "row", alignItems: "center", flex: 2 }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            color={COLORS.blueIOS}
            size={18}
          />

          <AppText
            type="medium"
            children="Atrás"
            style={{ fontSize: 18, color: COLORS.blueIOS }}
          />
        </TouchableOpacity>

        <AppText
          type="semiBold"
          children="Categorías"
          style={{
            fontSize: 18,
            flex: 10,
            textAlign: "center",
            paddingEnd: "14%",
          }}
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
        <View style={{ width: "48%" }}>
          <IconButton
            iconName="book-search-outline"
            label="Buscar"
            onPress={() => props.setShowSearchBar(!props.showSearchBar)}
          />
        </View>

        <View style={{ width: "3%" }} />

        <View style={{ width: "48%" }}>
          <IconButton
            iconName="plus-circle-outline"
            label="Crear"
            onPress={() => props.onPress(undefined)}
          />
        </View>
      </View>

      {props.showSearchBar && (
        <AppTextInput
          onChangeText={props.setSearch}
          placeholder="Busca una categoría"
          value={props.search}
          theme="light"
        />
      )}

      <View style={{ marginVertical: "1.5%" }} />

      <AppIndicator
        data={props.categories}
        loading={false}
        message="No hay categorías para mostrar"
      />

      {props.loading && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator
            size={20}
            color={COLORS.blueIOS}
            style={{ marginTop: 20 }}
          />
        </View>
      )}

      {!props.loading && (
        <FlatList
          data={props.categories}
          renderItem={(item) => <OptionCategoriesRenderItem {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </Animatable.View>
  );
};

export default OptionCategoriesScreen;
