import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { CashRegister } from "../../../../domain/entities/cash-register";
import AppText from "../../atoms/AppText";
import { COLORS } from "../../../styles/colors";

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
    <View style={{ flex: 8 }}>
      <AppText
        children={`CAJA ${props.index + 1}`}
        type="bold"
        style={{ fontSize: 20, marginBottom: 10 }}
      />

      <AppText
        children={`${props.item.date} ${props.item.time}`}
        type="medium"
        numberOfLines={1}
        style={{ fontSize: 16, marginBottom: 10 }}
      />
    </View>

    <View style={{ alignItems: "flex-end", flex: 4 }}>
      <AppText
        children={`$${props.item.initial_cash}`}
        type="bold"
        numberOfLines={1}
        style={{ fontSize: 20, marginBottom: 10, color: COLORS.blueIOS }}
      />
    </View>
  </TouchableOpacity>
);

export default CashRegisterRenderItem;
