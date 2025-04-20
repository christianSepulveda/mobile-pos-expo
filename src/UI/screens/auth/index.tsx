import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { styles } from "./styles";

import AppText from "../../components/atoms/AppText";
import AppTextInput from "../../components/molecules/AppTextInput";
import AppButton from "../../components/molecules/AppButton";
import { LoginError } from "../../../domain/types/auth-types";
import { StatusBar } from "expo-status-bar";

type Props = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleAuth: () => void;
  error: LoginError;
};

const LoginScreen = (props: Props) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar translucent style="dark" />

      <Text style={styles.welcomeText}>Bienvenido</Text>

      <View style={styles.spacing} />

      <AppTextInput
        onChangeText={props.setEmail}
        placeholder="Correo electrónico"
        value={props.email}
        error={props.error?.emailError}
        theme="light"
      />

      <View style={styles.spacing} />

      <AppTextInput
        onChangeText={props.setPassword}
        placeholder="Contraseña"
        value={props.password}
        error={props.error?.passwordError}
        secureTextEntry={true}
        theme="light"
      />

      <View style={styles.spacing} />
      {props.error && props.error.message.length > 0 && (
        <AppText type="semiBold" style={styles.errorMessage}>
          {props.error.message}
        </AppText>
      )}
      <View style={styles.spacing} />

      <AppButton onPress={props.handleAuth} label="Iniciar sesión" />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
