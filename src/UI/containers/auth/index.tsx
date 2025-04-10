import { useState } from "react";
import LoginScreen from "../../screens/auth";
import { LoginError } from "../../../domain/types/auth-types";
import { UserService } from "../../../infrastructure/services/user-service";
import { User } from "../../../domain/entities/user";
import { CompanyService } from "../../../infrastructure/services/company-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  handleAuth: (user: User) => void;
};

const LoginContainer = (props: Props) => {
  const userService = new UserService();
  const companyService = new CompanyService();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<LoginError>(null);

  const validateErrors = () => {
    let message = "";
    let emailError = false;
    let passwordError = false;

    setError(null);

    if (email.length === 0 && password.length === 0) {
      emailError = true;
      passwordError = true;
      message = "Todos los campos son requeridos";
      setError({ message, emailError, passwordError });

      return true;
    }

    if (email.length === 0) {
      message = "El correo electrónico es requerido";
      emailError = true;
      setError({ message, emailError, passwordError });

      return true;
    }

    if (password.length === 0) {
      message = "La contraseña es requerida";
      passwordError = true;
      setError({ message, emailError, passwordError });

      return true;
    }

    return false;
  };

  const handleAuth = async () => {
    if (validateErrors()) return;
    const response = await userService.find({ email, password });

    if ("error" in response && response.message === "Email incorrecto") {
      const message = response.message;
      const error = { message, emailError: true, passwordError: false };

      setError(error);
      return;
    }

    if ("error" in response && response.message === "Contraseña incorrecta") {
      const message = response.message;
      const error = { message, emailError: false, passwordError: true };

      setError(error);
      return;
    }

    if ("companyid" in response) {
      const company = await companyService.find(response.companyid);
      console.log("company", company);
      await AsyncStorage.setItem("company", JSON.stringify(company));
    }

    setEmail("");
    setPassword("");
    props.handleAuth(response as User);
  };

  return (
    <LoginScreen
      error={error}
      email={email}
      password={password}
      setEmail={(email) => setEmail(email.toLowerCase())}
      setPassword={setPassword}
      handleAuth={handleAuth}
    />
  );
};

export default LoginContainer;
