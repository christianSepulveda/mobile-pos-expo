import { StyleSheet } from "react-native";
import { COLORS } from "../../../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: COLORS.whiteSmoke,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    flex: 10,
    textAlign: "center",
    paddingEnd: "14%",
  },
  spacingLarge: {
    marginTop: 40,
  },
  spacingMedium: {
    marginTop: 20,
  },
  spacingSmall: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
  },
  card: {
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  cardRow: {
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  cardRowText: {
    fontSize: 18,
    width: "96%",
  },
  notesText: {
    fontSize: 16,
  },
});
