import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";

type Props = {
  onPress: () => void;
  label: string;
};

const AppButton = (props: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <AppText type="bold" style={styles.text}>
        {props.label}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;
