import { TouchableOpacity, View } from "react-native";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { Sell } from "../../../../domain/entities/sell";
import { COLORS } from "../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";

type RenderItemProps = {
  item: Sell;
  index: number;
  onPress: (item: Sell) => void;
};

const HistoryRenderItem = (props: RenderItemProps) => {
  const date = props.item.date;
  const time = props.item.time;

  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.item)}
      style={styles.touchable}
    >
      <View style={styles.itemContainer}>
        <Ionicons
          name="time-outline"
          size={25}
          color={COLORS.blueIOS}
          style={{ marginEnd: 10 }}
        />

        <View style={{ flex: 8 }}>
          <AppText children={`${time}`} type="medium" style={styles.largeText} />

          <View style={styles.spacing} />

          <AppText
            children={`${date}`}
            type="light"
            style={styles.shortText}
          />
        </View>

        <View style={{ alignItems: "flex-end", flex: 4 }}>
          <AppText
            children={`$${props.item.total}`}
            numberOfLines={1}
            type="medium"
            style={{ ...styles.largeText, color: COLORS.blueIOS }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryRenderItem;
