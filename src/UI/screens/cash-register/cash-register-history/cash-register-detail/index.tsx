import { View, TouchableOpacity, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../../styles/colors";
import AppText from "../../../../components/atoms/AppText";
import { CashRegister } from "../../../../../domain/entities/cash-register";
import moment from "moment";
import { CashRegisterCalculation } from "../../../../containers/cash-register/cash-register-history/cash-register-detail";
import { CashMovement } from "../../../../../domain/entities/cash-movement";

import DifferenceRow from "../../../../components/organism/DifferenceRow";
import DifferenceCashCountRow from "../../../../components/organism/DifferenceCashCount";
import { styles } from "./styles";
import CashRegisterMovementsModal from "../../../../components/organism/CashRegisterMovementsModal";

type Props = {
  movements: CashMovement[];
  cashRegister: CashRegister;
  systemCalculation: CashRegisterCalculation;
  userCalculation: CashRegisterCalculation;

  cashDifference: number;
  debitDifference: number;
  creditDifference: number;
  transferenceDifference: number;

  showModal: boolean;

  onBackPress: () => void;
  setShowModal: (show: boolean) => void;
};

const CashRegisterDetailScreen = (props: Props) => {
  const formattedDate = moment(
    props.cashRegister.open_date,
    "YYYY/MM/DD"
  ).format("DD/MM/YYYY");

  return (
    <Animatable.View
      animation={"fadeInRight"}
      duration={100}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onBackPress}
          style={{ flexDirection: "row", alignItems: "center", flex: 2 }}
        >
          <Ionicons name="chevron-back" color={COLORS.blueIOS} size={18} />

          <AppText
            type="medium"
            children="Atrás"
            style={{ fontSize: 18, color: COLORS.blueIOS }}
          />
        </TouchableOpacity>

        <AppText
          type="semiBold"
          style={styles.headerTitle}
          children={`Detalle ${formattedDate}`}
          numberOfLines={1}
        />
      </View>

      <View style={styles.spacingLarge} />

      <ScrollView>
        <View style={styles.card}>
          <AppText
            type="medium"
            style={styles.sectionTitle}
            children={`Diferencias:`}
            numberOfLines={1}
          />

          <View style={styles.spacingSmall} />

          <DifferenceRow label="Efectivo" value={`${props.cashDifference}`} />
          <DifferenceRow label="Débito" value={`${props.debitDifference}`} />
          <DifferenceRow label="Crédito" value={`${props.creditDifference}`} />
          <DifferenceRow
            label="Transferencia"
            value={`${props.transferenceDifference}`}
          />
        </View>

        <View style={styles.spacingLarge} />

        <View style={styles.card}>
          <DifferenceCashCountRow
            label="Pago"
            system="Esperado"
            user="Ingresado"
          />

          <View
            style={{
              borderBottomColor: COLORS.gray,
              borderBottomWidth: 1,
              paddingBottom: 3,
              marginBottom: 15,
            }}
          />

          <DifferenceCashCountRow
            label="Efectivo"
            system={`${props.systemCalculation?.cash ?? 0}`}
            user={`${props.userCalculation?.cash ?? 0}`}
          />
          <View style={styles.spacingSmall} />

          <DifferenceCashCountRow
            label="Débito"
            system={`${props.systemCalculation?.debit ?? 0}`}
            user={`${props.userCalculation?.debit ?? 0}`}
          />
          <View style={styles.spacingSmall} />

          <DifferenceCashCountRow
            label="Crédito"
            system={`${props.systemCalculation?.credit ?? 0}`}
            user={`${props.userCalculation?.credit ?? 0}`}
          />
          <View style={styles.spacingSmall} />

          <DifferenceCashCountRow
            label="Transferencia"
            system={`${props.systemCalculation?.transference ?? 0}`}
            user={`${props.userCalculation?.transference ?? 0}`}
          />
        </View>

        <View style={styles.spacingLarge} />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.setShowModal(true)}
          style={styles.cardRow}
        >
          <AppText
            type="medium"
            style={styles.cardRowText}
            children={`Informe de ingresos y retiros`}
            numberOfLines={1}
          />

          <Ionicons name="chevron-forward" color={COLORS.blueIOS} size={20} />
        </TouchableOpacity>

        <View style={styles.spacingLarge} />

        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="clipboard-outline"
              color={COLORS.blueIOS}
              style={{ marginEnd: 5 }}
              size={18}
            />

            <AppText
              type="medium"
              style={styles.sectionTitle}
              children={`Observaciones:`}
              numberOfLines={1}
            />
          </View>

          <View style={styles.spacingMedium} />

          <AppText
            type="medium"
            style={{
              ...styles.notesText,
              color:
                props.cashRegister.notes.length > 0
                  ? COLORS.blackIOS
                  : COLORS.grayDark,
            }}
            children={
              props.cashRegister.notes.length > 0
                ? props.cashRegister.notes
                : "Sin observaciones..."
            }
          />
        </View>

        <CashRegisterMovementsModal
          movements={props.movements}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
        />

        <View style={styles.spacingMedium} />
      </ScrollView>
    </Animatable.View>
  );
};

export default CashRegisterDetailScreen;
