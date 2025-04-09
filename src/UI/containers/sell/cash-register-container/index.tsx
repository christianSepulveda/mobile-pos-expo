import { useEffect, useState } from "react";
import CashRegisterScreen from "../../../screens/sell/cash-register-screen";
import { CashRegister } from "../../../../domain/entities/cash-register";
import { CashRegisterService } from "../../../../infrastructure/services/cash-register-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../../../domain/entities/user";
import { CompanyService } from "../../../../infrastructure/services/company-service";
import { Company } from "../../../../domain/entities/company";
import moment from "moment";

type Props = {
  changeStep: () => void;
  onBackPress?: () => void;
};

const CashRegisterContainer = (props: Props) => {
  const cashRegisterService = new CashRegisterService();
  const companyService = new CompanyService();

  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>();
  const [numberOfCashRegisters, setNumberOfCashRegisters] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [initialAmount, setInitialAmount] = useState(0);

  const handleGetCashRegisters = async () => {
    const user = await AsyncStorage.getItem("user");
    const parsedUser = user ? (JSON.parse(user) as User) : null;

    if (!parsedUser) return;

    const response = await cashRegisterService.findAll(parsedUser.companyid);
    await handleGetCompany(parsedUser.companyid);

    const data = response as CashRegister[];
    const activeCashRegisters = data.filter(
      (item) => item.active === true && item.companyid === parsedUser.companyid
    );

    setCashRegisters(activeCashRegisters);
  };

  const handleGetCompany = async (companyid: string) => {
    const response = (await companyService.find(companyid)) as Company;
    if (!response) return;

    setNumberOfCashRegisters(response.numberOfRegisters);
  };

  const handleOpenCashRegister = async () => {
    const user = await AsyncStorage.getItem("user");
    const parsedUser = user ? (JSON.parse(user) as User) : null;

    if (!parsedUser) return;

    const cashRegister: CashRegister = {
      date: moment().format("YYYY/MM/DD"),
      time: moment().format("HH:mm"),
      initial_cash: initialAmount,
      active: true,
      companyid: parsedUser.companyid,
      userid: parsedUser.id,
      cash_difference: 0,
      closing_cash: 0,
      closing_time: "",
      expected_cash: 0,
      notes: "",
      total_sales: 0,
    };

    await cashRegisterService.save(cashRegister);
    await handleGetCashRegisters();
    setInitialAmount(0);
    setShowModal(false);
  };

  const handlePressCashRegister = async (item: CashRegister) => {
    const cashRegisterId = item.id;
    await AsyncStorage.setItem("cashRegisterId", cashRegisterId ?? "");
    props.changeStep();
  };

  useEffect(() => {
    handleGetCashRegisters();
  }, []);

  return (
    <CashRegisterScreen
      cashRegisters={cashRegisters ?? []}
      numberOfCashRegisters={numberOfCashRegisters}
      showModal={showModal}
      setShowModal={setShowModal}
      initialAmount={initialAmount}
      setInitialAmount={setInitialAmount}
      handleOpenCashRegister={handleOpenCashRegister}
      onPressCashRegister={handlePressCashRegister}
      onBackPress={props.onBackPress}
    />
  );
};

export default CashRegisterContainer;
