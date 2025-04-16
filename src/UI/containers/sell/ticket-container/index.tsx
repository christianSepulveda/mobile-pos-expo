import { useEffect, useState } from "react";
import TicketScreen from "../../../screens/sell/ticket-screen";
import { Detail } from "../../../../domain/entities/sell-summary";
import { Alert } from "react-native";
import { Sell } from "../../../../domain/entities/sell";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { SellDetail } from "../../../../domain/entities/sell-detail";
import { SellService } from "../../../../infrastructure/services/sell-service";
import { SellDetailService } from "../../../../infrastructure/services/sell-detail-service";

type Props = {
  total: number;
  products: Detail[];
  paymentMethod: string;
  payment: number;
  clearContext: () => void;
};

const TicketContainer = (props: Props) => {
  const sellService = new SellService();
  const sellDetailService = new SellDetailService();

  const [loading, setLoading] = useState(false);

  const handleSaveSell = async () => {
    setLoading(true);

    const user = await AsyncStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    const cashRegister = await AsyncStorage.getItem("cashRegisterId");
    if (!cashRegister) return;

    if (!parsedUser) {
      Alert.alert("Error", "No se ha podido obtener los datos de usuario");
      props.clearContext();
      setLoading(false);
      return;
    }

    const sell: Sell = {
      date: moment().format("YYYY/MM/DD"),
      time: moment().format("HH:mm"),

      total: props.total,
      cash: props.payment,
      change: props.payment - props.total,

      payment_method: props.paymentMethod,
      cash_register_id: cashRegister,
      companyid: parsedUser.companyid,

      userid: parsedUser.id,
      active: true,
    };

    const response = (await sellService.saveSell(sell)) as Sell;
    handleSaveSellDetail(response.id ?? "");
  };

  const handleSaveSellDetail = async (sellId: string) => {
    if (!sellId) {
      Alert.alert("Error", "No se ha podido guardar la venta");
      props.clearContext();
      setLoading(false);
      return;
    }

    const details: SellDetail[] = props.products.map((product) => ({
      sellid: sellId,
      productid: product.productid,
      quantity: product.quantity,
      total: product.total,
    }));

    await Promise.all(
      details.map((detail) => sellDetailService.saveSellDetail(detail))
    );

    setLoading(false);
  };

  useEffect(() => {
    if (props.products.length === 0 || props.total === 0) {
      const title = "Error al enviar";
      const desc = "Hemos tenido un error al enviar la transacción";

      Alert.alert(title, desc);
      props.clearContext();
    } else {
      handleSaveSell();
    }
  }, []);

  return (
    <TicketScreen
      loading={loading}
      total={props.total}
      products={props.products}
      onPress={props.clearContext}
    />
  );
};

export default TicketContainer;
