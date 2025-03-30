import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import AppText from "../../components/atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";

type Props = {};

type OptionItemProps = {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

const OptionScreen = (props: Props) => {
  const OptionItem = (optionProps: OptionItemProps) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        paddingHorizontal: 10,
        borderBottomColor: COLORS.grayLight,
        borderBottomWidth: 1,
      }}
      onPress={optionProps.onPress}
    >
      <AppText
        type="semiBold"
        numberOfLines={1}
        style={{ fontSize: 20, flex: 11 }}
        children={optionProps.title}
      />

      <Ionicons
        name={optionProps.iconName}
        size={24}
        color={COLORS.grayLight}
        style={{ marginLeft: 10, flex: 1 }}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, paddingTop: 80, paddingHorizontal: 20 }}>
      <AppText
        type="semiBold"
        numberOfLines={1}
        style={{
          fontSize: 20,
          marginBottom: 5,
          color: COLORS.grayDark,
        }}
        children={"Opciones"}
      />

      <OptionItem
        iconName="cart"
        title="Administrar productos"
        onPress={() => {}}
      />
      <OptionItem
        iconName="clipboard"
        title="Administrar categorías"
        onPress={() => {}}
      />

      <AppText
        type="semiBold"
        numberOfLines={1}
        style={{
          fontSize: 20,
          marginTop: 50,
          marginBottom: 5,
          color: COLORS.grayDark,
        }}
        children={"Usuario"}
      />

      <OptionItem
        iconName="lock-closed"
        title="Cambiar contraseña"
        onPress={() => {}}
      />
      <OptionItem iconName="log-out" title="Cerrar sesión" onPress={() => {}} />
    </ScrollView>
  );
};

export default OptionScreen;
