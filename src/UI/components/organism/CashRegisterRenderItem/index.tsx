import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CashRegister } from "../../../../domain/entities/cash-register";
import AppText from "../../atoms/AppText";
import { COLORS } from "../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: CashRegister;
  index: number;
  onPress: (item: CashRegister) => void;
};

const CashRegisterRenderItem = (props: Props) => (
  <TouchableOpacity
    onPress={() => props.onPress(props.item)}
    activeOpacity={0.8}
    style={{
      marginBottom: 20,
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <Ionicons
      name="pricetag-outline"
      color={COLORS.blueIOS}
      size={26}
      style={{ marginEnd: 20 }}
    />

    <View style={{ flex: 8 }}>
      <AppText
        children={`${props.item.open_time}`}
        type="medium"
        style={{ fontSize: 20, marginBottom: 5 }}
      />

      <AppText
        children={`${props.item.open_date} `}
        type="light"
        numberOfLines={1}
        style={{ fontSize: 16, marginBottom: 5 }}
      />
    </View>

    <View style={{ alignItems: "flex-end", flex: 4 }}>
      <AppText
        children={`$${props.item.open_cash}`}
        type="regular"
        numberOfLines={1}
        style={{ fontSize: 20, marginBottom: 5, color: COLORS.blueIOS }}
      />
    </View>
  </TouchableOpacity>
);

export default CashRegisterRenderItem;
