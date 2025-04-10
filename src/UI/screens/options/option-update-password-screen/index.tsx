import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../../components/atoms/AppText";
import { COLORS } from "../../../styles/colors";
import AppTextInput from "../../../components/molecules/AppTextInput";
import AppButton from "../../../components/molecules/AppButton";

type Props = {
  adminCode: string;
  newPassword: string;
  setAdminCode: (adminCode: string) => void;
  setNewPassword: (newPassword: string) => void;
  onPasswordChange: () => void;
  onBackPress: () => void;
};

const OptionUpdatePasswordScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 70 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={props.onBackPress}>
          <Ionicons name="chevron-back" color={COLORS.blueIOS} size={35} />
        </TouchableOpacity>
        <AppText
          type="bold"
          style={{ fontSize: 25 }}
          children="Cambiar contraseña"
          numberOfLines={1}
        />
      </View>

      <View style={{ height: 25 }} />

      <AppTextInput
        value={props.adminCode}
        onChangeText={props.setAdminCode}
        placeholder="Código de administrador"
        secureTextEntry={true}
        theme="light"
        keyboardType="number-pad"
      />

      <View style={{ height: 15 }} />

      <AppTextInput
        value={props.newPassword}
        onChangeText={props.setNewPassword}
        placeholder="Nueva contraseña"
        secureTextEntry={true}
        theme="light"
        keyboardType="default"
      />

      <View style={{ height: 35 }} />

      <AppButton label="Actualizar" onPress={props.onPasswordChange} />
    </View>
  );
};

export default OptionUpdatePasswordScreen;
