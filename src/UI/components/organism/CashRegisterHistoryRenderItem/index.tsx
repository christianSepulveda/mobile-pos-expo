import moment from "moment";
import { TouchableOpacity, View } from "react-native";
import { CashRegister } from "../../../../domain/entities/cash-register";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";

type CashRegisterHistoryRenderItemProps = {
  item: CashRegister;
  index: number;
  onPressItem: (item: CashRegister) => void;
};

const CashRegisterHistoryRenderItem = (
  props: CashRegisterHistoryRenderItemProps
) => {
  const active = props.item.active;
  const openDate = moment(props.item.open_date, "YYYY/MM/DD");
  const openTime = moment(props.item.open_time, "hh:mm").format("hh:mm A");
  const closingTime = moment(props.item.closing_time, "hh:mm").format(
    "hh:mm A"
  );

  const color = active ? COLORS.blueIOS : COLORS.redApple;
  const text = active ? "ABIERTA" : "CERRADA";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onPressItem(props.item)}
    >
      <View style={styles.detailsContainer}>
        <AppText
          children={moment(openDate).format("DD/MM/YYYY")}
          style={styles.dateText}
          type="bold"
        />

        <View style={styles.spacingSmall} />

        <AppText
          children={"Apertura: " + openTime}
          style={styles.timeText}
          type="regular"
        />

        <View style={styles.spacingExtraSmall} />

        {!active && (
          <AppText
            children={`Cierre: ${closingTime}`}
            style={styles.timeText}
            type="regular"
          />
        )}
      </View>

      <View style={styles.statusContainer}>
        <AppText
          style={{ ...styles.statusText, color }}
          children={text}
          type="bold"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CashRegisterHistoryRenderItem;
