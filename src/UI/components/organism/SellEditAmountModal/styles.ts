import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  productName: {
    fontSize: 22,
  },
  productCode: {
    fontSize: 16,
    marginTop: 10,
  },
  marginVertical10: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  marginVertical5: {
    marginVertical: 5,
  },
  marginVertical38: {
    marginVertical: "38%",
  },
  acceptButton: {
    width: "100%",
    backgroundColor: COLORS.blueIOS,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButtonText: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: "center",
  },
});
