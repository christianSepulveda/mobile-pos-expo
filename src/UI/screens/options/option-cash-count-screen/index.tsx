import { View, Text, KeyboardAvoidingView } from "react-native";
import React from "react";
import { CashRegister } from "../../../../domain/entities/cash-register";
import AppText from "../../../components/atoms/AppText";
import AppTextInput from "../../../components/molecules/AppTextInput";
import AppButton from "../../../components/molecules/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";

type Props = {
  cashRegister: CashRegister;
  onCloseCashRegister: () => void;
  onBackPress: () => void;
  setCashRegister: (cashRegister: CashRegister) => void;
};

const OptionCashCountScreen = (props: Props) => {
  const initialCash = props.cashRegister.initial_cash ?? "";
  const closingCash = props.cashRegister.closing_cash ?? "";
  const notes = props.cashRegister.notes ?? "";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: 70, paddingHorizontal: 20 }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Ionicons
          name="chevron-back"
          size={40}
          color={COLORS.blueIOS}
          onPress={props.onBackPress}
        />
        <AppText children="Cerrar Caja" type="bold" style={{ fontSize: 30 }} />
      </View>

      <AppText
        children="Fondo Inicial"
        type="medium"
        style={{ fontSize: 14, marginBottom: 5 }}
      />
      <AppTextInput
        value={initialCash + ""}
        onChangeText={() => {}}
        placeholder="Efectivo Inicial"
        theme="light"
        keyboardType="number-pad"
      />

      <View style={{ marginVertical: 10 }} />

      <AppText
        children="Efectivo Cierre"
        type="medium"
        style={{ fontSize: 14, marginBottom: 5 }}
      />
      <AppTextInput
        value={closingCash + ""}
        onChangeText={(text) =>
          props.setCashRegister({
            ...props.cashRegister,
            closing_cash: Number(text),
          })
        }
        placeholder="Efectivo Cierre"
        theme="light"
        keyboardType="number-pad"
      />

      <View style={{ marginVertical: 10 }} />

      <AppText
        children="Nota de cierre (opcional)"
        type="medium"
        style={{ fontSize: 14, marginBottom: 5 }}
      />
      <AppTextInput
        value={notes}
        onChangeText={(text) =>
          props.setCashRegister({
            ...props.cashRegister,
            notes: text,
          })
        }
        placeholder="Nota de cierre"
        theme="light"
        keyboardType="default"
      />

      <View style={{ marginVertical: 20 }} />

      <AppButton label="Cerrar Caja" onPress={props.onCloseCashRegister} />
    </KeyboardAvoidingView>
  );
};

export default OptionCashCountScreen;
