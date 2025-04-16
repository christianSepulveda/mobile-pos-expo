import { useEffect, useState } from "react";
import CashRegisterHistoryScreen from "../../../screens/cash-register/cash-register-history";
import moment from "moment";
import { CashRegisterService } from "../../../../infrastructure/services/cash-register-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Company } from "../../../../domain/entities/company";
import { CashRegister } from "../../../../domain/entities/cash-register";

type Props = {
  onBackPress: (show: boolean) => void;
  showCashRegisterDetail: (cashRegister: CashRegister) => void;
};

const CashRegisterHistoryContainer = (props: Props) => {
  const cashRegisterService = new CashRegisterService();

  const today = moment().format("DD/MM/YYYY");
  const [date, setDate] = useState<string>(today);

  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>([]);
  const [filteredCashRegisters, setFilteredCashRegisters] = useState<
    CashRegister[]
  >([]);

  const [selectedCashRegister, setSelectedCashRegister] =
    useState<CashRegister>();

  const getAllCashRegister = async () => {
    const storageCompany = await AsyncStorage.getItem("company");
    if (!storageCompany) return;

    const company = JSON.parse(storageCompany) as Company;
    const response = await cashRegisterService.findAll(company.id ?? "");

    setCashRegisters(response as CashRegister[]);
    onChangeDate(today);
  };

  const onChangeDate = (date: string) => {
    const formattedDate = moment(date, "DD/MM/YYYY").format("YYYY/MM/DD");

    const filterCashRegisters = cashRegisters.filter(
      (cashRegister) => cashRegister.open_date === formattedDate
    );

    setFilteredCashRegisters(filterCashRegisters);
    setDate(date);
  };

  useEffect(() => {
    getAllCashRegister();
  }, []);

  return (
    <CashRegisterHistoryScreen
      date={date}
      cashRegisters={filteredCashRegisters}
      onChangeDate={onChangeDate}
      onBackPress={() => props.onBackPress(false)}
      onSelectCashRegister={props.showCashRegisterDetail}
    />
  );
};

export default CashRegisterHistoryContainer;
