import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import { TouchableOpacity } from "react-native";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";

type Props = {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

const OptionItem = (props: Props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={styles.optionItem}
    onPress={props.onPress}
  >
    <AppText
      type="medium"
      numberOfLines={1}
      style={styles.optionText}
      children={props.title}
    />

    <Ionicons
      name={(props.iconName + "-outline") as keyof typeof Ionicons.glyphMap}
      size={20}
      color={COLORS.blueIOS}
      style={styles.icon}
    />
  </TouchableOpacity>
);

export default OptionItem;
