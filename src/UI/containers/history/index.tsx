import { useState } from "react";
import HistoryScreen from "../../screens/history/sell-list";
import SellDetail from "../../screens/history/sell-detail";
import { Sell } from "../../../domain/entities/sell";

type Props = {};

const HistoryContainer = (props: Props) => {
  const [sell, setSell] = useState<Sell | undefined>();
  const [step, setStep] = useState(0);

  const onItemPress = (item: any) => {
    console.log(item);
    setSell(item);
    setStep(1);
  };

  const onBackPress = () => {
    setSell(undefined);
    setStep(0);
  };

  if (step === 0) return <HistoryScreen onItemPress={onItemPress} />;

  if (step === 1) return <SellDetail sell={sell} onBackPress={onBackPress} />;
};

export default HistoryContainer;
