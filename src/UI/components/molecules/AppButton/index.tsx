import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";

type Props = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  alignCenter?: boolean;
};

const AppButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: props.disabled ? COLORS.grayLight : COLORS.blueIOS,
          alignSelf: props.alignCenter ? "center" : undefined,
        },
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <AppText type="medium" style={styles.text}>
        {props.label}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;
