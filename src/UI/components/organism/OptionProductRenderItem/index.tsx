import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Product } from "../../../../domain/entities/product";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";

type Props = { item: Product; index: number; onPress: (item: Product) => void };

const OptionProductRenderItem = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onPress(props.item)}
      style={styles.itemContainer}
    >
      <View style={{ flex: 8 }}>
        <AppText
          children={`${props.item.code}`}
          type="medium"
          style={styles.shortText}
        />

        <View style={styles.spacing} />

        <AppText
          children={`${props.item.name}`}
          type="bold"
          numberOfLines={2}
          style={styles.largeText}
        />
      </View>

      <View style={{ alignItems: "flex-end", flex: 4 }}>
        <AppText
          children={`$${props.item.price}`}
          numberOfLines={1}
          type="bold"
          style={{ ...styles.largeText, color: COLORS.blueIOS }}
        />
      </View>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 10,
  },
  itemContainer: {
    padding: 15,
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  largeText: {
    color: COLORS.blackIOS,
    fontSize: 20,
  },
  shortText: {
    color: COLORS.blackIOS,
    fontSize: 14,
  },
  spacing: {
    marginTop: "2%",
  },
  spacingLarge: {
    marginTop: "8%",
  },
});

export default OptionProductRenderItem;
