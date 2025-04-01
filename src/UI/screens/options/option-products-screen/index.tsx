import { TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../../../components/atoms/AppText";

import IconButton from "../../../components/atoms/IconButton";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { FlatList } from "react-native-gesture-handler";
import { Products } from "../../../../domain/constants/data";
import OptionProductRenderItem from "../../../components/organism/OptionProductRenderItem";
import { Product } from "../../../../domain/entities/product";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";

type Props = {
  showSearchBar: boolean;
  setShowSearchBar: (showSearchBar: boolean) => void;
  onPress: (item: Product | undefined) => void;
  onBackPress: () => void;
};

const OptionProductsScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 70 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.onBackPress()}
        >
          <Ionicons name="chevron-back" color={COLORS.blueIOS} size={40} />
        </TouchableOpacity>

        <AppText
          type="bold"
          style={{ fontSize: 30 }}
          children="Productos"
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
          placeholder="Buscar codigo - nombre"
          value=""
          theme="light"
        />
      )}

      <View style={{ marginVertical: "1.5%" }} />

      <FlatList
        data={Products}
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

export default OptionProductsScreen;
