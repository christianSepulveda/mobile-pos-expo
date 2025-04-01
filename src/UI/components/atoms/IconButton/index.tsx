import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../../styles/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "../AppText";

type Props = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
  label: string;
};

const IconButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        marginBottom: 10,
        padding: 10,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        borderColor: COLORS.gray,
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <MaterialCommunityIcons
        name={props.iconName}
        size={20}
        color="black"
        style={{ flex: 2 }}
      />

      <AppText
        type="semiBold"
        children={props.label}
        style={{ fontSize: 18, flex: 10, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
