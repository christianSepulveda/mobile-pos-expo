import { useEffect, useState } from "react";

import LoginContainer from "./src/UI/containers/auth";
import AppRoutes from "./src/UI/routes";

export default function App() {
  const [auth, setAuth] = useState(false);

  const handleAuth = (isAuth: boolean) => {
    setAuth(isAuth);
  };

  useEffect(() => {
    handleAuth(false);
  }, []);

  return !auth ? (
    <AppRoutes />
  ) : (
    <LoginContainer handleAuth={(isAuth) => handleAuth(isAuth)} />
  );
}
