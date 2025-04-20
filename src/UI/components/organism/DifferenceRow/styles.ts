import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.gray,
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    flex: 10,
  },
  value: {
    fontSize: 16,
    flex: 5,
    textAlign: "right",
  },
});
