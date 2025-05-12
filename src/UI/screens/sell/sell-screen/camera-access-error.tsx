import { View, Text } from "react-native";
import React from "react";
import AppText from "../../../components/atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import AppButton from "../../../components/molecules/AppButton";

type Props = {
  requestCameraPermission: () => void;
};

const CameraAccessError = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Ionicons name="information-circle" color={COLORS.redApple} size={60} />

      <AppText
        style={{ fontSize: 26, textAlign: "center" }}
        children="¡No tenemos acceso a su cámara!"
        type="bold"
      />
      <AppText
        style={{ fontSize: 18, textAlign: "center", marginTop: 10 }}
        children="Puedes ir a los ajustes de la aplicación y habilitar el acceso a la cámara."
        type="medium"
      />

      <View style={{ marginVertical: 20 }} />

      <AppButton label="Ir a Ajustes" onPress={props.requestCameraPermission} />
    </View>
  );
};

export default CameraAccessError;
