import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import AppText from "../../components/atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../styles/colors";

type Props = {
  setSelectedOption: (option: number) => void;
};

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
        color={COLORS.blueIOS}
        style={{ marginLeft: 10, flex: 1 }}
      />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, paddingTop: 80, paddingHorizontal: 20 }}>
      <StatusBar translucent barStyle={"dark-content"} />
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
        onPress={() => props.setSelectedOption(0)}
      />
      <OptionItem
        iconName="clipboard"
        title="Administrar categorías"
        onPress={() => props.setSelectedOption(1)}
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
        onPress={() => props.setSelectedOption(2)}
      />
      <OptionItem iconName="log-out" title="Cerrar sesión" onPress={() => {}} />
    </ScrollView>
  );
};

export default OptionScreen;
