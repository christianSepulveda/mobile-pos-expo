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
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  totalCard: {
    width: "90%",
    height: 60,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});
