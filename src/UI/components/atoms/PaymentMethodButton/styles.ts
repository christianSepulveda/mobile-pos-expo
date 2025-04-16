import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  paymentMethodContainer: {
    width: "50%",
    padding: 10,
  },
  paymentMethodButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentMethodText: {
    fontSize: 18,
  },
});
