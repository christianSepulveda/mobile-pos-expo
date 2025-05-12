import moment from "moment";
import { Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CashRegisterScreen from "../../screens/cash-register";
import CashCountModal from "../../components/organism/CashCountModal";

import { User } from "../../../domain/entities/user";
import { CashMovement } from "../../../domain/entities/cash-movement";
import { CashRegister } from "../../../domain/entities/cash-register";
import { CashRegisterService } from "../../../infrastructure/services/cash-register-service";
import { CashMovementService } from "../../../infrastructure/services/cash-movement-service";
import { useFocusEffect } from "@react-navigation/native";
import CashRegisterHistoryContainer from "./cash-register-history";
import CashRegisterDetailContainer from "./cash-register-history/cash-register-detail";

type Props = {};

const CashRegisterContainer = (props: Props) => {
  const cashMovementService = new CashMovementService();
  const cashRegisterService = new CashRegisterService();

  const [cashMovement, setCashMovement] = useState<CashMovement>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [type, setType] = useState<string>("");

  const [cashRegister, setCashRegister] = useState<CashRegister>();
  const [showCashCount, setShowCashCount] = useState<boolean>(false);
  const [showCashHistory, setShowCashHistory] = useState<boolean>(false);

  const [detailCashRegister, setDetailCashRegister] = useState<CashRegister>();
  const [showCashRegisterDetail, setShowCashRegisterDetail] =
    useState<boolean>(false);

  const clearStates = () => {
    setAmount("");
    setNote("");
    setType("");
    setCashMovement(undefined);
    setShowCashCount(false);
    setShowCashHistory(false);
  };

  const handleGetCurrentCashRegister = async () => {
    const cashRegisterId = await AsyncStorage.getItem("cashRegisterId");
    if (!cashRegisterId) {
      Alert.alert("Atención", "No a seleccionado o abierto una caja");
      return;
    }

    const currentCashRegister = await cashRegisterService.findOne(
      cashRegisterId
    );

    if (currentCashRegister && "id" in currentCashRegister) {
      setCashRegister(currentCashRegister as CashRegister);
    }
  };

  const handleChangeCashMovement = async () => {
    const cashRegisterId = await AsyncStorage.getItem("cashRegisterId");
    const userString = await AsyncStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    if (!user || !cashRegisterId) return;

    const cashMovementData: CashMovement = {
      date: moment().format("YYYY/MM/DD"),
      time: moment().format("HH:mm"),
      amount: Number(amount),
      cashRegisterId,
      note,
      type: type as "INCOME" | "EXPENSE",
      userId: user.id,
    };

    setCashMovement(cashMovementData);
  };

  const onCashMovement = async () => {
    await handleCheckOpenCashRegister();
    if (!cashMovement) return;

    const response = (await cashMovementService.save(
      cashMovement
    )) as CashMovement;

    if (response.id) {
      Alert.alert("Listo", "Movimiento guardado");
      clearStates();
      return;
    }

    Alert.alert("Error", "No se pudo guardar el movimiento");
  };

  const handleCheckOpenCashRegister = async () => {
    const cashRegisterId = await AsyncStorage.getItem("cashRegisterId");

    if (cashRegisterId) {
      await handleGetCurrentCashRegister();
      setDisabled(false);
      return;
    }

    clearStates();
    setDisabled(true);
  };

  const handleCloseCashRegister = async () => {
    const storageUser = await AsyncStorage.getItem("user");
    const user = storageUser ? JSON.parse(storageUser) : null;
    if (!user || !cashRegister) return;

    const closedCashRegister: CashRegister = {
      id: cashRegister.id,

      open_cash: cashRegister.open_cash,
      open_date: cashRegister.open_date,
      open_time: cashRegister.open_time,
      open_userid: cashRegister.open_userid,

      closing_time: moment().format("HH:mm"),
      closing_date: moment().format("YYYY/MM/DD"),
      closing_userid: user.id,

      closing_cash: cashRegister.closing_cash,
      closing_credit: cashRegister.closing_credit,
      closing_debit: cashRegister.closing_debit,
      closing_transference: cashRegister.closing_transference,

      notes: cashRegister.notes,
      companyid: cashRegister.companyid,
      active: false,
    };

    await cashRegisterService.update(closedCashRegister);
    await AsyncStorage.removeItem("cashRegisterId");

    clearStates();
    setDisabled(true);

    alert("Caja cerrada correctamente");
  };

  const handleShowCashRegisterDetail = (cashRegister: CashRegister) => {
    setShowCashHistory(false);
    setShowCashRegisterDetail(true);
    setDetailCashRegister(cashRegister);
  };

  useFocusEffect(
    useCallback(() => {
      handleCheckOpenCashRegister();
    }, [])
  );

  useEffect(() => {
    handleCheckOpenCashRegister();
  }, []);

  useEffect(() => {
    handleChangeCashMovement();
  }, [amount, type, note]);

  if (showCashHistory) {
    return (
      <CashRegisterHistoryContainer
        onBackPress={setShowCashHistory}
        showCashRegisterDetail={handleShowCashRegisterDetail}
      />
    );
  }

  if (showCashRegisterDetail) {
    return (
      <CashRegisterDetailContainer
        cashRegister={detailCashRegister as CashRegister}
        onBackPress={() => {
          setShowCashRegisterDetail(false);
          setShowCashHistory(true);
        }}
      />
    );
  }

  return (
    <>
      <CashRegisterScreen
        type={type}
        note={note}
        amount={amount}
        disabled={disabled}
        setNote={setNote}
        setType={setType}
        setAmount={setAmount}
        onCashMovement={onCashMovement}
        setShowCashCount={setShowCashCount}
        setShowCashHistory={setShowCashHistory}
      />

      <CashCountModal
        visible={showCashCount}
        onClose={() => setShowCashCount(false)}
        onConfirm={handleCloseCashRegister}
        cashRegister={cashRegister ?? ({} as CashRegister)}
        setCashRegister={setCashRegister}
      />
    </>
  );
};

export default CashRegisterContainer;
