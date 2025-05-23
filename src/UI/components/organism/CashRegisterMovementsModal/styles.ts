import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  modalHeaderText: {
    fontSize: 18,
    flex: 1,
  },
  modalHeaderAmount: {
    textAlign: "right",
  },
  modalRow: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  modalRowText: {
    fontSize: 18,
    flex: 1,
  },
  modalRowAmount: {
    fontSize: 18,
    flex: 1,
    textAlign: "right",
  },
});
