import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import { SellProduct } from "../../../containers/sell/sell-container";

type RenderItemProps = {
  item: SellProduct;
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
      <AppText
        children={`X${item.multiplier ?? 1}`}
        type="bold"
        style={{
          color: COLORS.grayDark,
          fontSize: 25,
          marginEnd: 20,
          marginStart: 10,
        }}
      />

      <View style={{ flex: 8 }}>
        <AppText
          children={`${item.code}`}
          type="medium"
          style={styles.shortText}
        />

        <View style={styles.spacing} />

        <AppText
          children={`${item.name}`}
          type="bold"
          numberOfLines={2}
          style={styles.largeText}
        />
      </View>

      <View style={{ alignItems: "flex-end", flex: 4 }}>
        <AppText
          children={`$${item.price}`}
          numberOfLines={1}
          type="bold"
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
