import AsyncStorage from "@react-native-async-storage/async-storage";
import { CashRegister } from "../../../../../domain/entities/cash-register";
import { CashMovementService } from "../../../../../infrastructure/services/cash-movement-service";
import CashRegisterDetailScreen from "../../../../screens/cash-register/cash-register-history/cash-register-detail";
import { Company } from "../../../../../domain/entities/company";
import { useEffect } from "react";

type Props = {
  onBackPress: () => void;
  cashRegister: CashRegister;
};

const CashRegisterDetailContainer = (props: Props) => {
  const cashMovementService = new CashMovementService();

  const handleGetCashMovements = async () => {
    const cashRegisterId = await AsyncStorage.getItem("cashRegisterId");
    if (!cashRegisterId) return;

    const movements = await cashMovementService.findAll(cashRegisterId);
    
  };

  useEffect(() => {
    handleGetCashMovements();
  }, []);

  return (
    <CashRegisterDetailScreen
      onBackPress={props.onBackPress}
      cashRegister={props.cashRegister}
    />
  );
};

export default CashRegisterDetailContainer;
