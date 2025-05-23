import { View } from "react-native";
import AppText from "../../atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";

type Props = { label: string; system: string; user: string };

const DifferenceCashCountRow = ({ label, system, user }: Props) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    {label !== "Pago" && (
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
    )}

    <AppText
      type="medium"
      style={{ fontSize: 16, flex: 10 }}
      children={label}
      numberOfLines={1}
    />

    <AppText
      type="regular"
      style={{ fontSize: 16, flex: 5, textAlign: "right" }}
      children={system}
      numberOfLines={1}
    />

    <AppText
      type="regular"
      style={{ fontSize: 16, flex: 6, textAlign: "right" }}
      children={user}
      numberOfLines={1}
    />
  </View>
);

export default DifferenceCashCountRow;
