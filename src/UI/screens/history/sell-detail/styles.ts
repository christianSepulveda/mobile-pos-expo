import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteSmoke,
  },
  marginVertical10: {
    marginVertical: "10%",
  },
  marginVertical2: {
    marginVertical: "2%",
  },
  titleText: {
    fontSize: 18,
    flex: 10,
    textAlign: "center",
    paddingEnd: "14%",
  },
  dateText: {
    fontSize: 14,
  },
  footer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    margin: 20,
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
