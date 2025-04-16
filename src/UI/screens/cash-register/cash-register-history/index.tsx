import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../components/atoms/AppText";
import { COLORS } from "../../../styles/colors";
import { DatePickerInput } from "react-native-paper-dates";
import moment from "moment";
import { CashRegister } from "../../../../domain/entities/cash-register";
import CashRegisterHistoryRenderItem from "../../../components/organism/CashRegisterHistoryRenderItem";

type Props = {
  date: string;
  cashRegisters: CashRegister[];
  onBackPress: () => void;
  onChangeDate: (date: string) => void;
};

const CashRegisterHistoryScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 70 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={props.onBackPress}>
          <Ionicons name="chevron-back" color={COLORS.blueIOS} size={40} />
        </TouchableOpacity>

        <AppText
          type="bold"
          style={{ fontSize: 26 }}
          children="Historial de Caja"
          numberOfLines={1}
        />
      </View>

      <View style={{ marginTop: 40 }} />

      <View style={{ width: "100%", height: 50 }}>
        <DatePickerInput
          locale="es"
          inputMode="start"
          mode="outlined"
          outlineColor={COLORS.gray}
          activeOutlineColor={COLORS.blueIOS}
          value={
            props.date ? moment(props.date, "DD/MM/YYYY").toDate() : new Date()
          }
          onChange={(date) =>
            props.onChangeDate(moment(date).format("DD/MM/YYYY"))
          }
          style={{
            backgroundColor: COLORS.white,
            marginBottom: 20,
          }}
        />
      </View>

      <View style={{ marginTop: 20 }} />

      <FlatList
        data={props.cashRegisters}
        renderItem={(item) => <CashRegisterHistoryRenderItem {...item} />}
      />
    </View>
  );
};

export default CashRegisterHistoryScreen;
