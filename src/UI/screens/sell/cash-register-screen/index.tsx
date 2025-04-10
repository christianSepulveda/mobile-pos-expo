import { FlatList, TouchableOpacity, View } from "react-native";
import { CashRegister } from "../../../../domain/entities/cash-register";
import AppText from "../../../components/atoms/AppText";
import AppButton from "../../../components/molecules/AppButton";
import AppModal from "../../../components/molecules/AppModal";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { COLORS } from "../../../styles/colors";
import CashRegisterRenderItem from "../../../components/organism/CashRegisterRenderItem";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  showModal: boolean;
  initialAmount: number;
  cashRegisters: CashRegister[];
  numberOfCashRegisters: string;

  handleOpenCashRegister: () => void;
  setShowModal: (show: boolean) => void;
  setInitialAmount: (amount: number) => void;
  onPressCashRegister: (item: CashRegister) => void;
  onBackPress?: () => void;
};

const CashRegisterScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, paddingTop: 65, paddingHorizontal: 20 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        {props.onBackPress && (
          <TouchableOpacity activeOpacity={0.8} onPress={props.onBackPress}>
            <Ionicons name="chevron-back" size={40} color={COLORS.blueIOS} />
          </TouchableOpacity>
        )}

        <AppText children="Cajas" type="bold" style={{ fontSize: 34 }} />
      </View>

      {props.cashRegisters.length === 0 && (
        <AppText
          children="No se registran cajas abiertas."
          type="medium"
          style={{ fontSize: 18 }}
        />
      )}

      <View>
        <FlatList
          data={props.cashRegisters}
          renderItem={(item) => (
            <CashRegisterRenderItem
              {...item}
              onPress={props.onPressCashRegister}
            />
          )}
        />
      </View>

      {props.cashRegisters.length < Number(props.numberOfCashRegisters) && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 20,
          }}
        >
          <AppButton
            label="Abrir una caja"
            onPress={() => props.setShowModal(true)}
          />
        </View>
      )}

      <AppModal
        visible={props.showModal}
        onClose={() => props.setShowModal(false)}
      >
        <AppText
          children="Abrir una Caja"
          type="bold"
          style={{ fontSize: 25, marginBottom: 20 }}
        />

        <AppTextInput
          placeholder="Monto incial"
          value={props.initialAmount.toString()}
          onChangeText={(text) => props.setInitialAmount(Number(text))}
          keyboardType="number-pad"
          theme="light"
        />

        <View style={{ marginBottom: 30 }} />

        <AppButton
          label="Abrir una caja"
          onPress={props.handleOpenCashRegister}
        />
      </AppModal>
    </View>
  );
};

export default CashRegisterScreen;
