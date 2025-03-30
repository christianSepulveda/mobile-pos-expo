import { useEffect, useState } from "react";
import SellContainer, { SellProduct } from "./sell-container";
import { View } from "react-native";
import PaymentContainer from "./payment-container";

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
        <PaymentContainer total={total} onBackPress={handleGoBack} />
      )}
    </View>
  );
};

export default SellIndex;
