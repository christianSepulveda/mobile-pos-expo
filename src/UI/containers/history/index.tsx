import { useEffect, useState } from "react";
import HistoryScreen from "../../screens/history/sell-list";
import SellDetailScreen from "../../screens/history/sell-detail";
import { Sell } from "../../../domain/entities/sell";
import { SellService } from "../../../infrastructure/services/sell-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { SellSummary } from "../../../domain/entities/sell-summary";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { View } from "react-native";
import { COLORS } from "../../styles/colors";

type Props = {};

const HistoryContainer = (props: Props) => {
  const sellService = new SellService();
  const today = moment().format("DD/MM/YYYY");

  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [lastSeacrh, setLastSearch] = useState("");

  const [sells, setSells] = useState<Sell[] | undefined>();
  const [detail, setDetail] = useState<SellSummary>();
  const [totalSells, setTotalSells] = useState(0);

  const [loading, setLoading] = useState(false);

  const onItemPress = async (item: Sell) => {
    if (!item.id) return;
    await handleGetSellDetail(item.id);
    setStep(1);
  };

  const onBackPress = () => {
    setStep(0);
  };

  const handleGetSells = async () => {
    setLoading(true);
    setSells(undefined);

    const data = await AsyncStorage.getItem("user");
    const user = JSON.parse(data ?? "{}");

    const companyId = user.companyid;
    const requestDate = moment(date, "DD/MM/YYYY").format("YYYY/MM/DD");

    const response = await sellService.findAllSellsByDate(
      requestDate,
      companyId
    );

    if (Array.isArray(response)) {
      const total = response.reduce((acc, curr) => {
        return acc + (curr.total || 0);
      }, 0);

      setTotalSells(total);
    }

    setLoading(false);
    setLastSearch(date);
    setSells(response as Sell[]);
  };

  const handleGetSellDetail = async (id: string) => {
    setLoading(true);
    const response = (await sellService.findSellDetails(id)) as SellSummary;

    setDetail(response);
    setLoading(false);
  };

  const handleChangeDate = (date: string) => {
    setDate(date);
    handleGetSells();
  };

  const initComponent = async () => {
    setDate(today);
    await handleGetSells();
  };

  useFocusEffect(
    useCallback(() => {
      initComponent();
    }, [])
  );

  useEffect(() => {
    initComponent();
  }, []);

  useEffect(() => {
    if (lastSeacrh !== date) {
      handleGetSells();
    }
  }, [date, lastSeacrh]);

  return (
    <View
      style={{ flex: 1, paddingBottom: 10, backgroundColor: COLORS.whiteSmoke }}
    >
      {step === 0 && (
        <HistoryScreen
          data={sells}
          date={date}
          onItemPress={onItemPress}
          onChangeDate={handleChangeDate}
          totalSells={totalSells}
          loading={loading}
        />
      )}

      {step === 1 && (
        <SellDetailScreen
          sell={detail}
          onBackPress={onBackPress}
          loading={loading}
        />
      )}
    </View>
  );
};

export default HistoryContainer;
