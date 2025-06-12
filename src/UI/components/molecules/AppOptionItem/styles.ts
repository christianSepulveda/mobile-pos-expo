import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    flex: 11,
  },
  icon: {
    marginLeft: 10,
    flex: 1,
  },
});
