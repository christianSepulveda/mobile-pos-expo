import { View, FlatList } from "react-native";
import React from "react";
import AppModal from "../../molecules/AppModal";
import { CashMovement } from "../../../../domain/entities/cash-movement";
import AppText from "../../atoms/AppText";
import { COLORS } from "../../../styles/colors";
import { styles } from "./styles";
import moment from "moment";

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
        <AppText
          type="bold"
          style={styles.modalHeaderText}
          numberOfLines={1}
          children={"Tipo"}
        />
        <AppText
          type="bold"
          style={styles.modalHeaderText}
          numberOfLines={1}
          children={"Fecha"}
        />
        <AppText
          type="bold"
          style={{ ...styles.modalHeaderText, ...styles.modalHeaderAmount }}
          numberOfLines={1}
          children={"Monto"}
        />
      </View>

      <FlatList
        data={props.movements}
        renderItem={({ item }) => (
          <View style={styles.modalRow}>
            <AppText
              type="medium"
              style={styles.modalRowText}
              numberOfLines={1}
              children={item.type === "INCOME" ? "Ingreso" : "Egreso"}
            />

            <AppText
              type="medium"
              style={styles.modalRowText}
              numberOfLines={1}
              children={moment(item.date, "YYYY/MM/DD").format("DD/MM/YYYY")}
            />

            <AppText
              type="bold"
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
