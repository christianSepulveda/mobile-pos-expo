import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  spacing: {
    marginTop: "4%",
  },
  spacingLarge: {
    marginTop: "8%",
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteSmoke,
    paddingTop: "16%",
    paddingHorizontal: "5%",
  },
  totalContainer: {
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
