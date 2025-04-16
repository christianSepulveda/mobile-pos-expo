import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 9,
  },
  dateText: {
    fontSize: 18,
  },
  timeText: {
    fontSize: 14,
  },
  spacingSmall: {
    marginVertical: 5,
  },
  spacingExtraSmall: {
    marginVertical: 2.5,
  },
  statusContainer: {
    flex: 5,
  },
  statusText: {
    fontSize: 18,
    textAlign: "right",
  },
});
