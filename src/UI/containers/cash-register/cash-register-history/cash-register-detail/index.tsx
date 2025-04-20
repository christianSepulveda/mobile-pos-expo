import AsyncStorage from "@react-native-async-storage/async-storage";
import { CashRegister } from "../../../../../domain/entities/cash-register";
import { CashMovementService } from "../../../../../infrastructure/services/cash-movement-service";
import CashRegisterDetailScreen from "../../../../screens/cash-register/cash-register-history/cash-register-detail";
import { Company } from "../../../../../domain/entities/company";
import { useEffect, useState } from "react";
import { SellService } from "../../../../../infrastructure/services/sell-service";
import { CashMovement } from "../../../../../domain/entities/cash-movement";
import { Sell } from "../../../../../domain/entities/sell";
import { ActivityIndicator } from "react-native";

type Props = {
  onBackPress: () => void;
  cashRegister: CashRegister;
};

export type CashRegisterCalculation = {
  cash: number;
  debit: number;
  credit: number;
  transference: number;
};

const CashRegisterDetailContainer = (props: Props) => {
  const [systemCalculation, setSystemCalculation] =
    useState<CashRegisterCalculation>();

  const [userCalculation, setUserCalculation] =
    useState<CashRegisterCalculation>();

  const [movements, setMovements] = useState<CashMovement[]>([]);
  const [showMovementsModal, setShowMovementsModal] = useState(false);

  const cashMovementService = new CashMovementService();
  const sellService = new SellService();

  const handleGetCashMovements = async () => {
    const cashRegisterId = props.cashRegister.id;
    if (!cashRegisterId) return;

    const movements = await cashMovementService.findAll(cashRegisterId);
    const sells = await sellService.findSells(cashRegisterId);

    if (!Array.isArray(movements) || !Array.isArray(sells)) return;

    setMovements(movements);
    handleSystemCalculation(movements, sells);

    setUserCalculation({
      cash: props.cashRegister.closing_cash,
      debit: props.cashRegister.closing_debit,
      credit: props.cashRegister.closing_credit,
      transference: props.cashRegister.closing_transference,
    });
  };

  const handleSystemCalculation = (
    movements: CashMovement[],
    sells: Sell[]
  ) => {
    const totalSellCash = sells
      .filter((v) => v.payment_method === "Efectivo")
      .reduce((acc, curr) => acc + (curr.cash - curr.change), 0);

    const totalSellDebit = sells
      .filter((v) => v.payment_method === "Débito")
      .reduce((acc, curr) => acc + curr.total, 0);

    const totalSellCredit = sells
      .filter((v) => v.payment_method === "Crédito")
      .reduce((acc, curr) => acc + curr.total, 0);

    const totalSellTransference = sells
      .filter((v) => v.payment_method === "Transferencia")
      .reduce((acc, curr) => acc + curr.total, 0);

    let totalCash = totalSellCash;

    for (let movement of movements) {
      if (movement.type === "INCOME") totalCash += movement.amount;
      if (movement.type === "EXPENSE") totalCash -= movement.amount;
    }

    setSystemCalculation({
      cash: totalCash,
      debit: totalSellDebit,
      credit: totalSellCredit,
      transference: totalSellTransference,
    });
  };

  const cashDifference =
    userCalculation && systemCalculation
      ? userCalculation.cash - systemCalculation.cash
      : 0;

  const debitDifference =
    userCalculation && systemCalculation
      ? userCalculation.debit - systemCalculation.debit
      : 0;

  const creditDifference =
    userCalculation && systemCalculation
      ? userCalculation.credit - systemCalculation.credit
      : 0;

  const transferenceDifference =
    userCalculation && systemCalculation
      ? userCalculation.transference - systemCalculation.transference
      : 0;

  useEffect(() => {
    handleGetCashMovements();
  }, []);

  return (
    <CashRegisterDetailScreen
      onBackPress={props.onBackPress}
      cashRegister={props.cashRegister}
      systemCalculation={systemCalculation as CashRegisterCalculation}
      userCalculation={userCalculation as CashRegisterCalculation}
      movements={movements}
      cashDifference={cashDifference}
      debitDifference={debitDifference}
      creditDifference={creditDifference}
      transferenceDifference={transferenceDifference}
      showModal={showMovementsModal}
      setShowModal={setShowMovementsModal}
    />
  );
};

export default CashRegisterDetailContainer;
