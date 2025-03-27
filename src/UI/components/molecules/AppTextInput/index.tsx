import { useState } from "react";
import { COLORS } from "../../../styles/colors";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

import { View, TextInput, ViewStyle } from "react-native";

type Props = {
  secureTextEntry?: boolean;
  error?: boolean;
  searchBar?: boolean;

  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
};

const AppTextInput = (props: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  const normalStyle: ViewStyle = {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightBlue,
    borderColor: props.error
      ? COLORS.redApple
      : isFocused && !props.error
      ? COLORS.blueIOS
      : !isFocused && !props.error
      ? COLORS.lightBlue
      : COLORS.redApple,
  };

  const searchBarStyle: ViewStyle = {
    borderWidth: 1,
    borderColor: isFocused ? COLORS.blueIOS : COLORS.lightBlue,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  };

  return (
    <View
      style={[styles.container, props.searchBar ? searchBarStyle : normalStyle]}
    >
      <TextInput
        style={styles.textInput}
        keyboardAppearance="dark"
        keyboardType="email-address"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={props.placeholder}
        placeholderTextColor={props.error ? COLORS.redApple : COLORS.grayLight}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        value={props.value}
      />

      {props.searchBar && (
        <Ionicons
          name="search"
          size={20}
          color={COLORS.purpleIndigo}
          style={{ width: "5%" }}
        />
      )}
    </View>
  );
};

export default AppTextInput;
