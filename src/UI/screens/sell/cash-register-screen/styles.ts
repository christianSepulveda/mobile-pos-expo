import { StyleSheet } from "react-native";
import { COLORS } from "../../../styles/colors";

export 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 2,
  },
  headerText: {
    fontSize: 18,
    flex: 10,
    textAlign: "center",
    paddingEnd: "0%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  modalHeaderText: {
    fontSize: 20,
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalInputSpacer: {
    marginBottom: 30,
  },
  warningRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  warningText: {
    fontSize: 16,
    color: COLORS.grayDark,
  },
  warningSpacer: {
    marginBottom: 10,
  },
});
