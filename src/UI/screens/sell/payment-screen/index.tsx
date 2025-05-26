import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import { View, TouchableOpacity, FlatList } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import AppText from "../../../components/atoms/AppText";
import AppTextInput from "../../../components/molecules/AppTextInput";
import { PaymentMethod } from "../../../../domain/entities/payment-method";
import PaymentMethodButton from "../../../components/atoms/PaymentMethodButton";
import SellDetailFooterRow from "../../../components/organism/SellDetailFooterRow";

type Props = {
  total: number;
  payment: string;
  data: PaymentMethod[];
  selectedMethod: string;

  onBackPress: () => void;
  onConfirmPayment: () => void;
  onSelect: (text: string) => void;
  setPayment: (payment: string) => void;
};

const PaymentScreen = (props: Props) => {
  const total = props.total;
  const change = Number(props.payment) - Number(total);
  const formattedChange = change < 0 ? 0 : change;

  const selectedMethodName =
    props.data.find((method) => method.id === props.selectedMethod)?.name || "";

  return (
    <View style={styles.container}>
      <StatusBar translucent style="dark" />

      <AppText
        type="medium"
        style={styles.title}
        children="Elija un medio de pago"
      />

      <View style={styles.infoContainer}>
        <Ionicons
          name="information-circle"
          color={COLORS.yellowAlert}
          size={25}
          style={styles.infoIcon}
        />
        <AppText
          type="light"
          style={styles.infoText}
          children={"Consulte por el método de pago antes de continuar."}
        />
      </View>

      <View style={styles.paymentMethodsList}>
        <FlatList
          data={props.data}
          renderItem={(item) => (
            <PaymentMethodButton
              {...item}
              onSelect={props.onSelect}
              selectedMethod={props.selectedMethod}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={styles.flatList}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>

      {props.selectedMethod === "1" && (
        <>
          <AppText
            type="regular"
            style={styles.cashPaymentTitle}
            children={"Pago en efectivo:"}
          />
          <AppTextInput
            onChangeText={props.setPayment}
            placeholder="Dinero en efectivo"
            value={props.payment}
            keyboardType="numeric"
            theme="light"
          />
        </>
      )}

      <View style={styles.footer}>
        <View style={styles.summaryContainer}>
          <SellDetailFooterRow label="Total" value={total + ""} />

          {selectedMethodName !== "" && (
            <SellDetailFooterRow
              label={selectedMethodName}
              value={props.payment}
            />
          )}

          <SellDetailFooterRow label="Vuelto" value={formattedChange + ""} />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={props.onBackPress}
            activeOpacity={0.8}
          >
            <AppText
              type="medium"
              style={styles.backButtonText}
              children={`Volver`}
            />
          </TouchableOpacity>

          <View style={styles.buttonSpacer} />

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={props.onConfirmPayment}
            activeOpacity={0.8}
          >
            <AppText
              type="semiBold"
              style={styles.confirmButtonText}
              children={`Aceptar`}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentScreen;
