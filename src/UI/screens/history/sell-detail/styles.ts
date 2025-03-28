import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteSmoke,
    padding: 20,
  },
  marginVertical10: {
    marginVertical: "10%",
  },
  marginVertical2: {
    marginVertical: "2%",
  },
  titleText: {
    fontSize: 25,
  },
  dateText: {
    fontSize: 14,
  },
  footer: {
    marginTop: "5%",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 25,
    color: COLORS.blueIOS,
  },
  backButton: {
    width: "100%",
    backgroundColor: COLORS.blueIOS,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    fontSize: 20,
    color: COLORS.white,
  },
});
