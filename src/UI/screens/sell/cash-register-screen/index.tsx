import { FlatList, TouchableOpacity, View } from "react-native";
import { CashRegister } from "../../../../domain/entities/cash-register";
import AppText from "../../../components/atoms/AppText";
import AppButton from "../../../components/molecules/AppButton";
import AppModal from "../../../components/molecules/AppModal";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { COLORS } from "../../../styles/colors";
import CashRegisterRenderItem from "../../../components/organism/CashRegisterRenderItem";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import AppIndicator from "../../../components/molecules/AppIndicator";

type Props = {
  showModal: boolean;
  initialAmount: number;
  cashRegisters: CashRegister[];
  numberOfCashRegisters: string;
  loading: boolean;

  handleOpenCashRegister: () => void;
  setShowModal: (show: boolean) => void;
  setInitialAmount: (amount: number) => void;
  onPressCashRegister: (item: CashRegister) => void;
  onBackPress?: () => void;
};

const CashRegisterScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, paddingTop: 65, paddingHorizontal: 20 }}>
      <StatusBar style="dark" backgroundColor="transparent" />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        {props.onBackPress && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onBackPress}
            style={{ flexDirection: "row", alignItems: "center", flex: 2 }}
          >
            <Ionicons name="chevron-back" color={COLORS.blueIOS} size={18} />

            <AppText
              type="medium"
              children="Atrás"
              style={{ fontSize: 18, color: COLORS.blueIOS }}
            />
          </TouchableOpacity>
        )}

        <AppText
          type="semiBold"
          style={{
            fontSize: 18,
            flex: 10,
            textAlign: "center",
            paddingEnd: "0%",
          }}
          children={`Seleccione una caja`}
          numberOfLines={1}
        />
      </View>

      <AppIndicator
        data={props.cashRegisters}
        loading={props.loading}
        message={`No se registran cajas abiertas.`}
      />

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
            bottom: 10,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <Ionicons
            name="add-outline"
            color={COLORS.blueIOS}
            size={20}
            style={{ marginEnd: 5 }}
          />
          <AppText
            children="Abrir una Caja"
            type="medium"
            style={{ fontSize: 20 }}
          />
        </View>

        <AppText
          type="regular"
          style={{ fontSize: 16, marginBottom: 5 }}
          children={`Monto inicial:`}
        />
        <AppTextInput
          placeholder="Monto incial"
          value={props.initialAmount.toString()}
          onChangeText={(text) => props.setInitialAmount(Number(text))}
          keyboardType="number-pad"
          theme="light"
        />

        <View style={{ marginBottom: 30 }} />

        {props.cashRegisters.length > 0 && (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="warning-outline"
                color={COLORS.orangeWarning}
                size={16}
                style={{ marginEnd: 5 }}
              />
              <AppText
                type="regular"
                style={{ fontSize: 16, color: COLORS.grayDark }}
                children={`Actualmente hay ${props.cashRegisters.length} cajas abiertas.`}
              />
            </View>

            <View style={{ marginBottom: 10 }} />
          </>
        )}

        <AppButton
          label="Abrir una caja"
          onPress={props.handleOpenCashRegister}
        />
      </AppModal>
    </View>
  );
};

export default CashRegisterScreen;
