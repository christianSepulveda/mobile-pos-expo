import { View, Text } from "react-native";
import React from "react";
import AppModal from "../../molecules/AppModal";
import AppText from "../../atoms/AppText";
import AppTextInput from "../../molecules/AppTextInput";
import { CashRegister } from "../../../../domain/entities/cash-register";
import AppButton from "../../molecules/AppButton";

type Props = {
  visible: boolean;
  cashRegister: CashRegister;
  onClose: () => void;
  onConfirm: () => void;
  setCashRegister: (cashRegister: CashRegister) => void;
};

const CashCountModal = (props: Props) => {
  const initialCash = props.cashRegister.open_cash ?? "";

  const closingCash = props.cashRegister.closing_cash ?? "";
  const closingDebit = props.cashRegister.closing_debit ?? "";
  const closingCredit = props.cashRegister.closing_credit ?? "";
  const closingTransference = props.cashRegister.closing_transference ?? "";

  const notes = props.cashRegister.notes ?? "";

  return (
    <AppModal visible={props.visible} onClose={props.onClose} height={"115%"}>
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

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginEnd: 5 }}>
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
        </View>

        <View style={{ marginVertical: 10 }} />

        <View style={{ flex: 1, marginStart: 5 }}>
          <AppText
            children="Débito Cierre"
            type="medium"
            style={{ fontSize: 14, marginBottom: 5 }}
          />
          <AppTextInput
            value={closingDebit + ""}
            onChangeText={(text) =>
              props.setCashRegister({
                ...props.cashRegister,
                closing_debit: Number(text),
              })
            }
            placeholder="Débito Cierre"
            theme="light"
            keyboardType="number-pad"
          />
        </View>
      </View>

      <View style={{ marginVertical: 10 }} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, marginEnd: 5 }}>
          <AppText
            children="Crédito Cierre"
            type="medium"
            style={{ fontSize: 14, marginBottom: 5 }}
          />
          <AppTextInput
            value={closingCredit.toString()}
            onChangeText={(text) =>
              props.setCashRegister({
                ...props.cashRegister,
                closing_credit: Number(text),
              })
            }
            placeholder="Crédito Cierre"
            theme="light"
            keyboardType="number-pad"
          />
        </View>

        <View style={{ marginVertical: 10 }} />

        <View style={{ flex: 1, marginStart: 5 }}>
          <AppText
            children="Transferencias Cierre"
            type="medium"
            style={{ fontSize: 14, marginBottom: 5 }}
          />
          <AppTextInput
            value={closingTransference.toString()}
            onChangeText={(text) =>
              props.setCashRegister({
                ...props.cashRegister,
                closing_transference: Number(text),
              })
            }
            placeholder="Transferencias Cierre"
            theme="light"
            keyboardType="number-pad"
          />
        </View>
      </View>

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

      <AppButton
        label="Cerrar Caja"
        onPress={props.onConfirm}
        alignCenter={true}
      />
    </AppModal>
  );
};

export default CashCountModal;
