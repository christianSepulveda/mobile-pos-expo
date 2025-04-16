import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import PaymentScreen from "../../../screens/sell/payment-screen";
import { PaymentMethods } from "../../../../domain/constants/data";

type Props = {
  total: number;
  onBackPress: () => void;
  onConfirmPayment: (payment: string, cash: string) => void;
};

const PaymentContainer = (props: Props) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [payment, setPayment] = useState("");

  const total = props.total;

  const handlePayment = () => {
    const change = Number(payment) - Number(total);

    if (selectedMethod === "") {
      Alert.alert(
        "Atención",
        "Debe seleccionar un método de pago antes de continuar."
      );

      return;
    }

    if (change < 0) {
      Alert.alert(
        "Atención",
        "El pago en efectivo es menor al monto total de la venta."
      );
      return;
    }

    const selectedPaymentMethod = PaymentMethods.find(
      (method) => method.id === selectedMethod
    );

    if (!selectedPaymentMethod) return;
    props.onConfirmPayment(selectedPaymentMethod.name, payment);
  };

  useEffect(() => {
    if (selectedMethod !== "1") {
      setPayment(props.total.toString());
    }
  }, [selectedMethod]);

  return (
    <PaymentScreen
      data={PaymentMethods}
      total={total}
      payment={payment}
      setPayment={setPayment}
      selectedMethod={selectedMethod}
      onSelect={setSelectedMethod}
      onBackPress={props.onBackPress}
      onConfirmPayment={handlePayment}
    />
  );
};

export default PaymentContainer;
