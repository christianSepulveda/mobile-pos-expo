import {
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AppText from "../../../components/atoms/AppText";
import { COLORS } from "../../../styles/colors";
import AppTextInput from "../../../components/molecules/AppTextInput";
import AppButton from "../../../components/molecules/AppButton";

type Props = {
  adminCode: string;
  newPassword: string;
  loading: boolean;
  setAdminCode: (adminCode: string) => void;
  setNewPassword: (newPassword: string) => void;
  onPasswordChange: () => void;
  onBackPress: () => void;
};

const OptionUpdatePasswordScreen = (props: Props) => {
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          onPress={props.onBackPress}
          style={{ flexDirection: "row", alignItems: "center", flex: 2 }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            color={COLORS.blueIOS}
            size={18}
          />

          <AppText
            type="medium"
            children="Atrás"
            style={{ fontSize: 18, color: COLORS.blueIOS }}
          />
        </TouchableOpacity>

        <AppText
          type="semiBold"
          children="Cambiar contraseña"
          style={{
            fontSize: 18,
            flex: 10,
            textAlign: "center",
            paddingEnd: "14%",
          }}
        />
      </View>

      <View style={{ height: 25 }} />

      {props.loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <AppText
            children="Espere un momento..."
            type="regular"
            style={{ fontSize: 20, marginBottom: 15 }}
          />
          <ActivityIndicator size={20} color={COLORS.blueIOS} />
        </View>
      )}

      {!props.loading && (
        <>
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

          <View style={{ height: 25 }} />

          <View style={styles.infoContainer}>
            <Ionicons
              name="information-circle"
              color={COLORS.yellowAlert}
              size={25}
              style={styles.infoIcon}
            />
            <AppText
              type="light"
              style={styles.infoText}
              children={
                "Los cambios de contraseña de un usuario deben ser solicitados " +
                "extrictamente al administrador."
              }
            />
          </View>

          <AppButton
            label="Actualizar"
            onPress={props.onPasswordChange}
            alignCenter
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 25,
    alignItems: "center",
  },
  infoIcon: {
    marginEnd: 5,
  },
  infoText: {
    fontSize: 14,
  },
});

export default OptionUpdatePasswordScreen;
