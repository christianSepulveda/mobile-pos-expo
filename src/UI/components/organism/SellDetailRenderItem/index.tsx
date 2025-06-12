import { View, Text, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import { Detail } from "../../../../domain/entities/sell-summary";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../../../domain/entities/product";

type RenderItemProps = {
  item: Detail | Product;
  index: number;
  swipeable?: any;
  onPress?: () => void;
  onDelete?: () => void;
};

const SellDetailRenderItem = ({
  item,
  onPress,
  onDelete,
  swipeable,
}: RenderItemProps) => {
  const renderRightActions = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.deleteButton}
      onPress={onDelete}
    >
      <Text style={styles.deleteText}>Eliminar</Text>
    </TouchableOpacity>
  );

  const Body = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{ marginBottom: 20 }}
    >
      <View style={styles.itemContainer}>
        <Ionicons
          name="bag-handle-outline"
          color={COLORS.blueIOS}
          size={30}
          style={{ marginStart: 5, marginEnd: 12 }}
        />

        <View style={{ flex: 8 }}>
          <AppText
            children={
              "quantity" in item
                ? `${item.quantity} - ${item.name}`
                : `${item.name}`
            }
            type="medium"
            numberOfLines={2}
            style={styles.largeText}
          />

          <View style={styles.spacing} />

          <AppText
            children={`${item.code}`}
            type="light"
            style={styles.shortText}
          />
        </View>

        <View style={{ alignItems: "flex-end", flex: 4 }}>
          <AppText
            children={
              "unit_price" in item
                ? `$${item.unit_price * item.quantity}`
                : `$${item.price}`
            }
            numberOfLines={1}
            type="medium"
            style={{ ...styles.largeText, color: COLORS.blueIOS }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (swipeable)
    return (
      <Swipeable renderRightActions={renderRightActions}>
        <Body />
      </Swipeable>
    );

  if (!swipeable) return <Body />;
};

export default SellDetailRenderItem;
