import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import { View, KeyboardAvoidingView } from "react-native";
import AppButton from "../../../components/molecules/AppButton";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { CashMovement } from "../../../../domain/entities/cash-movement";

import AppDropDown from "../../../components/molecules/AppDropDown";

type Props = {
  amount: string;
  type: string;
  note: string;
  cashMovement: CashMovement | undefined;
  setNote: (note: string) => void;
  onCashMovement: () => void;
  onBackPress: () => void;
  setAmount: (amount: string) => void;
  setType: (type: string) => void;
};

const DropdownTypes = [
  { id: "INCOME", name: "INGRESO" },
  { id: "EXPENSE", name: "RETIRO" },
];

const OptionCashMovementScreen = (props: Props) => {
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
        <AppText children="Movimientos" type="bold" style={{ fontSize: 30 }} />
      </View>

      <AppText
        children="Tipo de movimiento"
        type="medium"
        style={{ fontSize: 14, marginBottom: 5 }}
      />
      <AppDropDown
        data={DropdownTypes}
        selectedItem={DropdownTypes.filter((type) => type.id === props.type)[0]}
        onSelect={(selected) => props.setType(selected.id)}
      />

      <View style={{ marginVertical: 10 }} />

      <AppText
        children="Monto"
        type="medium"
        style={{ fontSize: 14, marginBottom: 5 }}
      />
      <AppTextInput
        value={props.amount}
        onChangeText={(text) => {
          props.setAmount(text);
        }}
        placeholder="Monto movimiento"
        theme="light"
        keyboardType="number-pad"
      />

      <View style={{ marginVertical: 10 }} />

      <AppText
        children="Descripción (opcional)"
        type="medium"
        style={{ fontSize: 14, marginBottom: 5 }}
      />
      <AppTextInput
        value={props.note}
        onChangeText={(text) => props.setNote(text)}
        placeholder="Nota movimiento"
        theme="light"
        keyboardType="default"
      />

      <View style={{ marginVertical: 20 }} />

      <AppButton label="Cerrar Caja" onPress={props.onCashMovement} />
    </KeyboardAvoidingView>
  );
};

export default OptionCashMovementScreen;
