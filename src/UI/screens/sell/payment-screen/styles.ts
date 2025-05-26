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
    marginBottom: 10,
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
    marginTop: "5%",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cashPaymentTitle: {
    fontSize: 16,
    marginTop: "5%",
    marginBottom: 5,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  summaryContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    marginTop: "5%",
    alignItems: "flex-end",
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
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.blueIOS,
    padding: 16,
  },
  backButtonText: {
    fontSize: 20,
    color: COLORS.blueIOS,
  },
  buttonSpacer: {
    flex: 0.5,
  },
  confirmButton: {
    flex: 5.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blueIOS,
    borderRadius: 6,
    padding: 16,
  },
  confirmButtonText: {
    fontSize: 20,
    color: COLORS.white,
  },
});
