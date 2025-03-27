import { useState } from "react";
import LoginScreen from "../../screens/auth";
import { LoginError } from "../../../domain/types/auth-types";

type Props = {
  handleAuth: (isAuth: boolean) => void;
};

const LoginContainer = (props: Props) => {
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

      return false;
    }

    if (email.length === 0) {
      message = "El correo electrónico es requerido";
      emailError = true;
      setError({ message, emailError, passwordError });

      return false;
    }

    if (password.length === 0) {
      message = "La contraseña es requerida";
      passwordError = true;
      setError({ message, emailError, passwordError });

      return false;
    }

    return true;
  };

  const handleAuth = () => {
    const isAuth = validateErrors();
    props.handleAuth(isAuth);
  };

  return (
    <LoginScreen
      error={error}
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleAuth={handleAuth}
    />
  );
};

export default LoginContainer;
