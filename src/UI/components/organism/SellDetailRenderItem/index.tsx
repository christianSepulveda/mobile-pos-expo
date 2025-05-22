import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import { SellProduct } from "../../../containers/sell/sell-container";
import { Detail } from "../../../../domain/entities/sell-summary";
import { Ionicons } from "@expo/vector-icons";

type RenderItemProps = {
  item: Detail;
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
      style={styles.itemContainer}
    >
      <Ionicons
        name="bag-check-outline"
        color={COLORS.blueIOS}
        size={30}
        style={{ marginStart: 5, marginEnd: 12 }}
      />

      <View style={{ flex: 8 }}>
        <AppText
          children={`${item.name} (${item.quantity})`}
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
          children={`$${item.unit_price * item.quantity}`}
          numberOfLines={1}
          type="medium"
          style={{ ...styles.largeText, color: COLORS.blueIOS }}
        />
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
