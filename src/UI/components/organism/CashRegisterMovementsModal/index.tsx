import { View, FlatList } from "react-native";
import React from "react";
import AppModal from "../../molecules/AppModal";
import { CashMovement } from "../../../../domain/entities/cash-movement";
import AppText from "../../atoms/AppText";
import { COLORS } from "../../../styles/colors";
import { styles } from "./styles";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  movements: CashMovement[];
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

const CashRegisterMovementsModal = (props: Props) => {
  return (
    <AppModal
      visible={props.showModal}
      onClose={() => props.setShowModal(false)}
    >
      <View style={styles.modalHeader}>
        <Ionicons
          name="information"
          size={18}
          color={COLORS.blueIOS}
          style={{ marginEnd: 5 }}
        />

        <AppText
          type="medium"
          style={styles.modalHeaderText}
          numberOfLines={1}
          children={"Tipo"}
        />
        <AppText
          type="medium"
          style={styles.modalHeaderText}
          numberOfLines={1}
          children={"Hora"}
        />
        <AppText
          type="medium"
          style={{ ...styles.modalHeaderText, ...styles.modalHeaderAmount }}
          numberOfLines={1}
          children={"Monto"}
        />
      </View>

      <FlatList
        data={props.movements}
        renderItem={({ item }) => (
          <View style={styles.modalRow}>
            <Ionicons
              name={
                item.type === "INCOME"
                  ? "trending-up-outline"
                  : "trending-down-outline"
              }
              size={18}
              color={item.type === "INCOME" ? COLORS.blueIOS : COLORS.redApple}
              style={{ marginEnd: 8 }}
            />

            <AppText
              type="regular"
              style={styles.modalRowText}
              numberOfLines={1}
              children={item.type === "INCOME" ? "Ingreso" : "Egreso"}
            />

            <AppText
              type="regular"
              style={styles.modalRowText}
              numberOfLines={1}
              children={item.time}
            />

            <AppText
              type="medium"
              style={{
                ...styles.modalRowAmount,
                color:
                  item.type === "INCOME" ? COLORS.blueIOS : COLORS.redApple,
              }}
              numberOfLines={1}
              children={`${
                item.type === "INCOME" ? "+" : "-"
              } ${item.amount.toString()}`}
            />
          </View>
        )}
      />
    </AppModal>
  );
};

export default CashRegisterMovementsModal;
