import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  touchable: {
    margin: "8%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.whiteSmoke,
  },
  largeText: {
    color: COLORS.blackIOS,
    fontSize: 16,
  },
  shortText: {
    color: COLORS.blackIOS,
    fontSize: 14,
  },
  spacing: {
    marginTop: "4%",
  },
  spacingLarge: {
    marginTop: "8%",
  },
});
