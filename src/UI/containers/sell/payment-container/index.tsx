import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import PaymentScreen from "../../../screens/sell/payment-screen";
import { PaymentMethods } from "../../../../domain/constants/data";

type Props = {
  total: number;
  onBackPress: () => void;
  onConfirmPayment: () => void;
};

const PaymentContainer = (props: Props) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  const total = props.total;

  const handlePayment = () => {
    if (selectedMethod === "") {
      Alert.alert(
        "Atención",
        "Debe seleccionar un método de pago antes de continuar."
      );

      return;
    }

    props.onConfirmPayment();
  };

  return (
    <PaymentScreen
      data={PaymentMethods}
      total={total}
      selectedMethod={selectedMethod}
      onSelect={setSelectedMethod}
      onBackPress={props.onBackPress}
      onConfirmPayment={handlePayment}
    />
  );
};

export default PaymentContainer;
