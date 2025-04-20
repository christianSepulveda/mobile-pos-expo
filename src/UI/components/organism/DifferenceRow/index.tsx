import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";

type Props = { label: string; value: string };

const DifferenceRow = ({ label, value }: Props) => (
  <View
    style={[
      styles.container,
      { borderBottomWidth: label === "Transferencia" ? 0 : 1 },
    ]}
  >
    <AppText
      type="bold"
      style={styles.label}
      children={label}
      numberOfLines={1}
    />

    <AppText
      type="bold"
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
