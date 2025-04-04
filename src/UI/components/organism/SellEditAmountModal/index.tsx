import { styles } from "./styles";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";

import AppModal from "../../molecules/AppModal";
import AppText from "../../atoms/AppText";
import AppTextInput from "../../molecules/AppTextInput";

import { SellProduct } from "../../../containers/sell/sell-container";
import { Detail } from "../../../../domain/entities/sell-summary";

type Props = {
  showEditModal: boolean;
  selectedProduct: Detail | null;
  setShowEditModal: (value: boolean) => void;
  onPressAccept: (multiplier: number) => void;
};

const EditAmountModal = (props: Props) => {
  const [amount, setAmount] = useState("");

  const handleOnChangeText = (text: string) => {
    if (/^\d*$/.test(text)) {
      setAmount(text);
    }
  };

  const handleOnPressAccept = () => {
    if (amount === "" || Number(amount) <= 0) {
      Alert.alert("Error", "La cantidad no puede ser 0");
      return;
    }

    props.onPressAccept(Number(amount));
    props.setShowEditModal(false);
    setAmount("");
  };

  useEffect(() => {
    setAmount(props.selectedProduct?.quantity.toString() ?? "");
  }, []);

  return (
    <AppModal
      visible={props.showEditModal}
      onClose={() => props.setShowEditModal(false)}
    >
      <AppText
        type="bold"
        style={styles.productName}
        children={props.selectedProduct?.name ?? ""}
        numberOfLines={2}
      />

      <AppText
        type="light"
        style={styles.productCode}
        children={props.selectedProduct?.code ?? ""}
        numberOfLines={2}
      />

      <View style={styles.marginVertical10} />

      <AppText
        type="regular"
        style={styles.label}
        children={"Cantidad"}
        numberOfLines={2}
      />

      <View style={styles.marginVertical5} />

      <AppTextInput
        onChangeText={handleOnChangeText}
        value={amount}
        placeholder="Cantidad"
        theme="light"
        keyboardType="numeric"
      />

      <View style={styles.marginVertical38} />

      <TouchableOpacity
        style={styles.acceptButton}
        activeOpacity={0.8}
        onPress={handleOnPressAccept}
      >
        <AppText
          type="bold"
          style={styles.acceptButtonText}
          children={"Aceptar"}
        />
      </TouchableOpacity>
    </AppModal>
  );
};

export default EditAmountModal;
