import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    paddingTop: "20%",
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  infoContainer: {
    flexDirection: "row",
    width: "90%",
    marginTop: 10,
    alignItems: "center",
  },
  infoIcon: {
    marginEnd: 5,
  },
  infoText: {
    fontSize: 14,
  },
  paymentMethodsList: {
    height: "30%",
  },
  flatList: {
    marginTop: "10%",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cashPaymentTitle: {
    fontSize: 16,
    marginTop: "5%",
    marginBottom: 10,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  summaryContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 20,
    marginBottom: 10,
  },
  divider: {
    width: "100%",
    height: 1,
    marginTop: 5,
    marginBottom: 15,
    backgroundColor: COLORS.grayLight,
  },
  changeText: {
    fontSize: 20,
    marginBottom: 15,
    color: COLORS.blueIOS,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
  },
  backButton: {
    flex: 5.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.grayLight,
    borderRadius: 10,
    padding: 20,
  },
  backButtonText: {
    fontSize: 20,
    color: COLORS.white,
  },
  buttonSpacer: {
    flex: 0.5,
  },
  confirmButton: {
    flex: 5.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blueIOS,
    borderRadius: 10,
    padding: 20,
  },
  confirmButtonText: {
    fontSize: 20,
    color: COLORS.white,
  },
});
