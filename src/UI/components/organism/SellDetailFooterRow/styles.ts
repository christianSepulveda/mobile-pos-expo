import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    flex: 10,
    fontSize: 20,
  },
  value: {
    flex: 5,
    textAlign: "right",
    fontSize: 20,
    color: COLORS.blueIOS,
  },
});
