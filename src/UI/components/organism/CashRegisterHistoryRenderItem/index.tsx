import moment from "moment";
import { TouchableOpacity, View } from "react-native";
import { CashRegister } from "../../../../domain/entities/cash-register";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

type CashRegisterHistoryRenderItemProps = {
  item: CashRegister;
  index: number;
  onPressItem: (item: CashRegister) => void;
};

const CashRegisterHistoryRenderItem = (
  props: CashRegisterHistoryRenderItemProps
) => {
  const active = props.item.active;

  const openDate = moment(props.item.open_date, "YYYY/MM/DD").format(
    "DD/MM/YYYY"
  );
  const closingDate = moment(props.item.closing_date, "YYYY/MM/DD").format(
    "DD/MM/YYYY"
  );

  const openTime = moment(props.item.open_time, "hh:mm").format("hh:mm A");
  const closingTime = moment(props.item.closing_time, "hh:mm").format(
    "hh:mm A"
  );

  const color = active ? COLORS.blueIOS : COLORS.redApple;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => !active && props.onPressItem(props.item)}
    >
      <Ionicons
        name={!active ? "lock-closed-outline" : "lock-open-outline"}
        size={40}
        style={styles.statusIcon}
        color={color}
      />

      <View style={styles.detailsContainer}>
        <AppText
          children={`Caja ${active ? "Abierta" : "Cerrada"}`}
          style={styles.dateText}
          type="semiBold"
        />

        <View style={styles.spacingSmall} />

        <AppText
          children={`Apertura: ${openDate} - ${openTime}`}
          style={styles.timeText}
          type="regular"
        />

        <View style={styles.spacingExtraSmall} />

        {!active && (
          <AppText
            children={`Cierre: ${closingDate} - ${closingTime}`}
            style={styles.timeText}
            type="regular"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CashRegisterHistoryRenderItem;
