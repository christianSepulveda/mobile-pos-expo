import { useState } from "react";
import OptionUpdatePasswordScreen from "../../../screens/options/option-update-password-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Company } from "../../../../domain/entities/company";
import { Alert } from "react-native";
import { UserService } from "../../../../infrastructure/services/user-service";
import { CompanyService } from "../../../../infrastructure/services/company-service";
import { User } from "../../../../domain/entities/user";

type Props = {
  onBackPress: () => void;
};

const OptionPasswordContainer = (props: Props) => {
  const userService = new UserService();
  const companyService = new CompanyService();

  const [adminCode, setAdminCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onPasswordChange = async () => {
    if (adminCode.length === 0 || newPassword.length === 0) {
      Alert.alert("Atención", "Todos los campos son requeridos");
      return;
    }

    const user = await AsyncStorage.getItem("user");
    if (!user) return;

    const userData = JSON.parse(user) as User;

    const adminCodeChallengePass = await companyService.validate(
      userData.companyid,
      adminCode
    );

    if (!adminCodeChallengePass) {
      Alert.alert("Atención", "No autorizado");
      return;
    }

    await userService.update({ ...userData, password: newPassword });
    setAdminCode("");
    setNewPassword("");
    Alert.alert("Lito", "Contraseña actualizada correctamente");
  };

  return (
    <OptionUpdatePasswordScreen
      adminCode={adminCode}
      newPassword={newPassword}
      setAdminCode={setAdminCode}
      setNewPassword={setNewPassword}
      onPasswordChange={onPasswordChange}
      onBackPress={props.onBackPress}
    />
  );
};

export default OptionPasswordContainer;
