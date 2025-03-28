import { Text, TextStyle } from "react-native";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { useEffect, useState } from "react";

type Props = {
  type: "light" | "regular" | "medium" | "semiBold" | "bold";
  children: string;
  style: TextStyle;
  numberOfLines?: number;
};

export const textType = {
  light: "Quicksand_300Light",
  regular: "Quicksand_400Regular",
  medium: "Quicksand_500Medium",
  semiBold: "Quicksand_600SemiBold",
  bold: "Quicksand_700Bold",
};

const AppText = (props: Props) => {
  const [fontFamily, setFontFamily] = useState("Quicksand_400Regular");

  const [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  useEffect(() => {
    setFontFamily(textType[props.type]);
  }, [props.type]);

  if (!fontsLoaded) return null;

  return (
    <Text style={[props.style, { fontFamily: fontFamily }]} numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};

export default AppText;
