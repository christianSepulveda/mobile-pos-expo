import { useCallback, useEffect, useState } from "react";
import SellContainer, { SellProduct } from "./sell-container";
import { View } from "react-native";
import PaymentContainer from "./payment-container";
import TicketContainer from "./ticket-container";
import { Detail } from "../../../domain/entities/sell-summary";
import CashRegisterContainer from "./cash-register-container";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../../styles/colors";

type Props = {};

const SellIndex = (props: Props) => {
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [products, setProducts] = useState<Detail[]>();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleRenderPayment = (amount: number, contextProducts: Detail[]) => {
    setTotal(amount);
    setProducts(contextProducts);
    setStep(2);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const clearContext = () => {
    setTotal(0);
    setProducts([]);
    setPaymentMethod("");
    setStep(1);
  };

  const handleInitialStep = async () => {
    const cashRegister = await AsyncStorage.getItem("cashRegisterId");

    if (cashRegister && cashRegister.length > 0) setStep(1);
    if (!cashRegister) setStep(0);
  };

  useEffect(() => {
    handleInitialStep();
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleInitialStep();
    }, [])
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.whiteSmoke }}>
      {step === 0 && <CashRegisterContainer changeStep={() => setStep(1)} />}

      {step === 1 && (
        <SellContainer
          changeStep={handleRenderPayment}
          context={{ products }}
        />
      )}

      {step === 2 && (
        <PaymentContainer
          total={total}
          onBackPress={handleGoBack}
          onConfirmPayment={(payment, cash) => {
            setPaymentMethod(payment);
            setPayment(Number(cash));
            setStep(3);
          }}
        />
      )}

      {step === 3 && (
        <TicketContainer
          total={total}
          products={products ?? []}
          paymentMethod={paymentMethod}
          payment={payment}
          clearContext={clearContext}
        />
      )}
    </View>
  );
};

export default SellIndex;
