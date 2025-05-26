import { styles } from "./styles";
import { View } from "react-native";
import AppText from "../../atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";

type SellDetailFooterRowProps = {
  label: string;
  value: string;
};

const SellDetailFooterRow = (props: SellDetailFooterRowProps) => {
  const label = props.label;
  let color = COLORS.orangeWarning;
  let iconName: React.ComponentProps<typeof Ionicons>["name"] =
    "return-down-back";

  if (label === "Total") iconName = "trending-up-outline";
  if (label === "Efectivo") iconName = "return-up-forward-outline";
  if (label === "Débito" || label === "Crédito")
    iconName = "return-up-forward-outline";
  if (label === "Transferencia") iconName = "repeat-outline";

  if (label === "Total") color = COLORS.greenSuccess;
  if (label === "Efectivo") color = COLORS.blueIOS;
  if (label === "Débito" || label === "Crédito") color = COLORS.blueIOS;
  if (label === "Transferencia") color = COLORS.blueIOS;

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
