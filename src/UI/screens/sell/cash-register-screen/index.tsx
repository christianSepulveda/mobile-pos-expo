import { FlatList, TouchableOpacity, View, StyleSheet } from "react-native";
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
import { styles } from "./styles";

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
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" />

      <View style={styles.headerRow}>
        {props.onBackPress && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onBackPress}
            style={styles.backButton}
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
          style={styles.headerText}
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
        <View style={styles.buttonContainer}>
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
        <View style={styles.modalHeader}>
          <Ionicons
            name="add-outline"
            color={COLORS.blueIOS}
            size={20}
            style={{ marginEnd: 5 }}
          />
          <AppText
            children="Abrir una Caja"
            type="medium"
            style={styles.modalHeaderText}
          />
        </View>

        <AppText
          type="regular"
          style={styles.modalLabel}
          children={`Monto inicial:`}
        />
        <AppTextInput
          placeholder="Monto incial"
          value={props.initialAmount.toString()}
          onChangeText={(text) => props.setInitialAmount(Number(text))}
          keyboardType="number-pad"
          theme="light"
        />

        <View style={styles.modalInputSpacer} />

        {props.cashRegisters.length > 0 && (
          <>
            <View style={styles.warningRow}>
              <Ionicons
                name="warning-outline"
                color={COLORS.orangeWarning}
                size={16}
                style={{ marginEnd: 5 }}
              />
              <AppText
                type="regular"
                style={styles.warningText}
                children={`Actualmente hay ${props.cashRegisters.length} cajas abiertas.`}
              />
            </View>

            <View style={styles.warningSpacer} />
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
