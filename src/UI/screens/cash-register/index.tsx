import * as Animatable from "react-native-animatable";
import { View, KeyboardAvoidingView, Alert } from "react-native";
import { styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import AppText from "../../components/atoms/AppText";
import AppDropDown from "../../components/molecules/AppDropDown";
import AppTextInput from "../../components/molecules/AppTextInput";
import AppButton from "../../components/molecules/AppButton";
import IconButton from "../../components/atoms/IconButton";

type Props = {
  type: string;
  note: string;
  amount: string;
  disabled: boolean;

  onCashMovement: () => void;
  setType: (type: string) => void;
  setNote: (note: string) => void;
  setAmount: (amount: string) => void;
  setShowCashCount: (showCashCount: boolean) => void;
  setShowCashHistory: (showCashHistory: boolean) => void;
};

const DropdownTypes = [
  { id: "INCOME", name: "INGRESO" },
  { id: "EXPENSE", name: "RETIRO" },
];

const CashRegisterScreen: React.FC<Props> = ({
  note,
  type,
  amount,
  disabled,
  setNote,
  setType,
  setAmount,
  onCashMovement,
  setShowCashCount,
  setShowCashHistory,
}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Animatable.View animation={"fadeInRight"} duration={100}>
        <StatusBar translucent style="dark" />

        <AppText
          type="medium"
          style={{ marginBottom: 30, fontSize: 35 }}
          children="Caja"
        />

        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            width: "100%",
            height: 60,
          }}
        >
          <View style={{ flex: 12 }}>
            <IconButton
              iconName="book-outline"
              label="Arqueo"
              onPress={() => {
                if (disabled) Alert.alert("No ha abierto una caja aún");

                if (!disabled) {
                  setShowCashCount(true);
                }
              }}
            />
          </View>

          <View style={{ flex: 1 }} />

          <View style={{ flex: 12 }}>
            <IconButton
              iconName="book-search"
              label="Histórico"
              onPress={() => setShowCashHistory(true)}
            />
          </View>
        </View>

        <AppText
          children="Tipo de movimiento"
          type="regular"
          style={{ fontSize: 14, marginBottom: 5 }}
        />
        <AppDropDown
          data={DropdownTypes}
          selectedItem={
            DropdownTypes.filter((typeItem) => typeItem.id === type)[0]
          }
          onSelect={(selected) => setType(selected.id)}
        />

        <View style={{ marginVertical: 10 }} />

        <AppText
          children="Monto"
          type="regular"
          style={{ fontSize: 14, marginBottom: 5 }}
        />
        <AppTextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Monto movimiento"
          theme="light"
          keyboardType="number-pad"
        />

        <View style={{ marginVertical: 10 }} />

        <AppText
          children="Descripción (opcional)"
          type="regular"
          style={{ fontSize: 14, marginBottom: 5 }}
        />
        <AppTextInput
          value={note}
          onChangeText={setNote}
          placeholder="Nota movimiento"
          theme="light"
          keyboardType="default"
        />

        <View style={{ marginVertical: 20 }} />

        <AppButton
          label="Guardar Movimiento"
          onPress={onCashMovement}
          disabled={disabled}
        />
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default CashRegisterScreen;
