import { styles } from "./styles";
import { View } from "react-native";
import AppText from "../../atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";

type SellDetailFooterRow = {
  label: string;
  value: string;
};

const SellDetailFooterRow = (props: SellDetailFooterRow) => {
  const label = props.label;
  const iconName =
    label === "Total"
      ? "trending-up-outline"
      : label === "Efectivo"
      ? "return-up-forward-outline"
      : "return-down-back";

  const color =
    label === "Total"
      ? COLORS.greenSuccess
      : label === "Efectivo"
      ? COLORS.blueIOS
      : COLORS.orangeWarning;

  return (
    <View style={styles.container}>
      <Ionicons
        name={iconName}
        size={18}
        color={color}
        style={{ marginEnd: 10 }}
      />

      <AppText
        type="medium"
        children={props.label}
        style={styles.label}
        numberOfLines={1}
      />

      <AppText
        type="regular"
        children={props.value}
        style={styles.value}
        numberOfLines={1}
      />
    </View>
  );
};

export default SellDetailFooterRow;
