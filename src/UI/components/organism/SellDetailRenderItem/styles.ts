import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

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
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    marginVertical: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
