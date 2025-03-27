import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: "8%",
    backgroundColor: COLORS.darkBlue,
  },
  welcomeText: {
    color: COLORS.whiteSmoke,
    fontSize: 55,
    fontWeight: "bold",
  },
  spacing: {
    marginVertical: "3%",
  },
  largeSpacing: {
    marginVertical: "10%",
  },
  errorMessage: {
    color: COLORS.redApple,
    fontSize: 14,
  },
});
