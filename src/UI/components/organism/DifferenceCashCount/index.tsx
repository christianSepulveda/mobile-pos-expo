import { View } from "react-native";
import AppText from "../../atoms/AppText";

type Props = { label: string; system: string; user: string };

const DifferenceCashCountRow = ({ label, system, user }: Props) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <AppText
      type="bold"
      style={{ fontSize: 16, flex: 10 }}
      children={label}
      numberOfLines={1}
    />

    <AppText
      type="medium"
      style={{ fontSize: 16, flex: 5, textAlign: "right" }}
      children={system}
      numberOfLines={1}
    />

    <AppText
      type="medium"
      style={{ fontSize: 16, flex: 6, textAlign: "right" }}
      children={user}
      numberOfLines={1}
    />
  </View>
);

export default DifferenceCashCountRow;
