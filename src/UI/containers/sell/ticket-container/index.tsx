import { useEffect, useState } from "react";
import TicketScreen from "../../../screens/sell/ticket-screen";

type Props = {
  total: number;
  clearContext: () => void;
};

const TicketContainer = (props: Props) => {
  const [loading, setLoading] = useState(false);

  const sendTransaction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(sendTransaction, []);

  return (
    <TicketScreen
      loading={loading}
      total={props.total}
      onPress={props.clearContext}
    />
  );
};

export default TicketContainer;
