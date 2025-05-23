import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

type Props = { label: string; value: string };

const DifferenceRow = ({ label, value }: Props) => (
  <View
    style={[
      styles.container,
      { borderBottomWidth: label === "Transferencia" ? 0 : 1 },
    ]}
  >
    <View style={{ flexDirection: "row", alignItems: "center", width: "50%" }}>
      <Ionicons
        name={
          label === "Efectivo"
            ? "wallet-outline"
            : label === "Débito" || label === "Crédito"
            ? "card-outline"
            : label === "Transferencia"
            ? "repeat-outline"
            : undefined
        }
        color={COLORS.blueIOS}
        style={{ marginEnd: 10 }}
        size={18}
      />

      <AppText
        type="medium"
        style={styles.label}
        children={label}
        numberOfLines={1}
      />
    </View>

    <AppText
      type="semiBold"
      style={{
        ...styles.value,
        color: Number(value) !== 0 ? COLORS.redApple : COLORS.blueIOS,
      }}
      children={Number(value) > 0 ? `+${value}` : `${value}`}
      numberOfLines={1}
    />
  </View>
);

export default DifferenceRow;
