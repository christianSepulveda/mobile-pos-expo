import { styles } from "./styles";
import { View } from "react-native";
import AppText from "../../atoms/AppText";

type SellDetailFooterRow = {
  label: string;
  value: string;
};

const SellDetailFooterRow = (props: SellDetailFooterRow) => (
  <View style={styles.container}>
    <AppText
      type="bold"
      children={props.label}
      style={styles.label}
      numberOfLines={1}
    />

    <AppText
      type="medium"
      children={props.value}
      style={styles.value}
      numberOfLines={1}
    />
  </View>
);

export default SellDetailFooterRow;
