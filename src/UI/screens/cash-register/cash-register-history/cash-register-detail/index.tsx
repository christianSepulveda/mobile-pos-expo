import { View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../styles/colors";
import AppText from "../../../../components/atoms/AppText";
import { CashRegister } from "../../../../../domain/entities/cash-register";
import moment from "moment";
import { CashRegisterCalculation } from "../../../../containers/cash-register/cash-register-history/cash-register-detail";

type Props = {
  cashRegister: CashRegister;
  systemCalculation: CashRegisterCalculation;
  userCalculation: CashRegisterCalculation;

  cashDifference: number;
  debitDifference: number;
  creditDifference: number;
  transferenceDifference: number;

  onBackPress: () => void;
};

type DifferenceRowProps = { label: string; value: string };

type DifferenceCashCount = { label: string; system: string; user: string };

const CashRegisterDetailScreen = (props: Props) => {
  const formattedDate = moment(
    props.cashRegister.open_date,
    "YYYY/MM/DD"
  ).format("DD/MM/YYYY");

  const DifferenceRow = ({ label, value }: DifferenceRowProps) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: label === "Transferencia" ? 0 : 1,
        borderBottomColor: COLORS.gray,
        paddingVertical: 10,
      }}
    >
      <AppText
        type="bold"
        style={{ fontSize: 16, flex: 10 }}
        children={label}
        numberOfLines={1}
      />

      <AppText
        type="bold"
        style={{
          fontSize: 16,
          flex: 5,
          textAlign: "right",
          color: Number(value) !== 0 ? COLORS.redApple : COLORS.blueIOS,
        }}
        children={Number(value) > 0 ? `+${value}` : `${value}`}
        numberOfLines={1}
      />
    </View>
  );

  const DifferenceCashCountRow = ({
    label,
    system,
    user,
  }: DifferenceCashCount) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <AppText
        type="bold"
        style={{ fontSize: 16, flex: 10 }}
        children={label}
        numberOfLines={1}
      />

      <AppText
        type="medium"
        style={{ fontSize: 16, flex: 5, textAlign: "right" }}
        children={system}
        numberOfLines={1}
      />

      <AppText
        type="medium"
        style={{ fontSize: 16, flex: 6, textAlign: "right" }}
        children={user}
        numberOfLines={1}
      />
    </View>
  );

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

      <ScrollView>
        <AppText
          type="bold"
          style={{ fontSize: 18 }}
          children={`Diferencias:`}
          numberOfLines={1}
        />

        <View style={{ marginTop: 10 }} />

        <View
          style={{
            padding: 15,
            backgroundColor: COLORS.white,
            borderRadius: 10,
          }}
        >
          <DifferenceRow label="Efectivo" value={`${props.cashDifference}`} />
          <DifferenceRow label="Débito" value={`${props.debitDifference}`} />
          <DifferenceRow label="Crédito" value={`${props.creditDifference}`} />
          <DifferenceRow
            label="Transferencia"
            value={`${props.transferenceDifference}`}
          />
        </View>

        <View style={{ marginTop: 25 }} />

        <AppText
          type="bold"
          style={{ fontSize: 18 }}
          children={`Arqueo:`}
          numberOfLines={1}
        />

        <View style={{ marginTop: 10 }} />

        <View
          style={{
            padding: 15,
            backgroundColor: COLORS.white,
            borderRadius: 10,
          }}
        >
          <DifferenceCashCountRow
            label="Pago"
            system="Esperado"
            user="Ingresado"
          />
          <View style={{ marginTop: 20 }} />

          <DifferenceCashCountRow
            label="Efectivo"
            system={`${props.systemCalculation?.cash ?? 0}`}
            user={`${props.userCalculation?.cash ?? 0}`}
          />
          <View style={{ marginTop: 10 }} />

          <DifferenceCashCountRow
            label="Débito"
            system={`${props.systemCalculation?.debit ?? 0}`}
            user={`${props.userCalculation?.debit ?? 0}`}
          />
          <View style={{ marginTop: 10 }} />

          <DifferenceCashCountRow
            label="Crédito"
            system={`${props.systemCalculation?.credit ?? 0}`}
            user={`${props.userCalculation?.credit ?? 0}`}
          />
          <View style={{ marginTop: 10 }} />

          <DifferenceCashCountRow
            label="Transferencia"
            system={`${props.systemCalculation?.transference ?? 0}`}
            user={`${props.userCalculation?.transference ?? 0}`}
          />
        </View>

        <View style={{ marginTop: 25 }} />

        <AppText
          type="bold"
          style={{ fontSize: 18 }}
          children={`Observaciones:`}
          numberOfLines={1}
        />

        <View style={{ marginTop: 10 }} />

        <View
          style={{
            padding: 15,
            backgroundColor: COLORS.white,
            borderRadius: 10,
          }}
        >
          <AppText
            type="medium"
            style={{ fontSize: 16 }}
            children={
              props.cashRegister.notes.length > 0
                ? props.cashRegister.notes
                : "Sin observaciones"
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CashRegisterDetailScreen;
