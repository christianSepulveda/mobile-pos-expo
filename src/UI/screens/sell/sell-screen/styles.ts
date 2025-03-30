import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.whiteSmoke },
  cameraBackground: { backgroundColor: COLORS.blackIOS },
  cameraContainer: { flex: 5, backgroundColor: COLORS.blackIOS },
  productsContainer: { flex: 7, padding: 20 },
  noProductsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProductsText: {
    fontSize: 22,
    textAlign: "center",
    width: "80%",
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  payButton: {
    flex: 9,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  payButtonText: { color: COLORS.white, fontSize: 20 },
  actionSpacer: { marginHorizontal: 8 },
  scanButton: {
    flex: 5,
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: COLORS.blueIOS,
    borderRadius: 10,
    marginTop: 20,
  },
  cancelButton: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "10%",
    right: 0,
  },
  cancelIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
