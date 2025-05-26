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
  const [loading, setLoading] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [initialAmount, setInitialAmount] = useState(0);

  const handleGetCashRegisters = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleGetCompany = async (companyid: string) => {
    setLoading(true);
    const response = (await companyService.find(companyid)) as Company;
    if (!response.id) return;

    setNumberOfCashRegisters(response.numberOfRegisters + "");
    setLoading(false);
  };

  const handleOpenCashRegister = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem("user");
    const parsedUser = user ? (JSON.parse(user) as User) : null;

    if (!parsedUser) return;

    const cashRegister: CashRegister = {
      open_date: moment().format("YYYY/MM/DD"),
      open_time: moment().format("HH:mm"),
      open_cash: initialAmount,
      open_userid: parsedUser.id,

      closing_cash: 0,
      closing_debit: 0,
      closing_credit: 0,
      closing_transference: 0,

      closing_userid: "",
      closing_date: "",
      closing_time: "",

      notes: "",

      active: true,
      companyid: parsedUser.companyid,
    };

    await cashRegisterService.save(cashRegister);
    await handleGetCashRegisters();
    setInitialAmount(0);
    setShowModal(false);
    setLoading(false);
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
      loading={loading}
    />
  );
};

export default CashRegisterContainer;
