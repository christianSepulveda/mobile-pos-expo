import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../styles/colors";
import AppText from "../../../../components/atoms/AppText";
import { CashRegister } from "../../../../../domain/entities/cash-register";
import moment from "moment";

type Props = {
  cashRegister: CashRegister;
  onBackPress: () => void;
};

const CashRegisterDetailScreen = (props: Props) => {
  const formattedDate = moment(
    props.cashRegister.open_date,
    "YYYY/MM/DD"
  ).format("DD/MM/YYYY");

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 70 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={props.onBackPress}>
          <Ionicons name="chevron-back" color={COLORS.blueIOS} size={40} />
        </TouchableOpacity>

        <AppText
          type="bold"
          style={{ fontSize: 26 }}
          children={`Detalle ${formattedDate}`}
          numberOfLines={1}
        />
      </View>

      <View style={{ marginTop: 40 }} />
    </View>
  );
};

export default CashRegisterDetailScreen;
