import { useEffect, useState } from "react";
import SellContainer, { SellProduct } from "./sell-container";
import { View } from "react-native";
import PaymentContainer from "./payment-container";
import TicketContainer from "./ticket-container";

type Props = {};

const SellIndex = (props: Props) => {
  const [step, setStep] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<SellProduct[]>();
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleRenderPayment = (
    amount: number,
    contextProducts: SellProduct[]
  ) => {
    setTotal(amount);
    setProducts(contextProducts);
    setStep(1);
  };

  const handleGoBack = () => {
    setStep(step - 1);
  };

  const clearContext = () => {
    setTotal(0);
    setProducts([]);
    setPaymentMethod("");
    setStep(0);
  };

  useEffect(() => {
    setStep(0);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {step === 0 && (
        <SellContainer
          changeStep={handleRenderPayment}
          context={{ products }}
        />
      )}

      {step === 1 && (
        <PaymentContainer
          total={total}
          onBackPress={handleGoBack}
          onConfirmPayment={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <TicketContainer total={total} clearContext={clearContext} />
      )}
    </View>
  );
};

export default SellIndex;
