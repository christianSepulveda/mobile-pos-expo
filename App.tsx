import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

import LoginContainer from "./src/UI/containers/auth";
import AppRoutes from "./src/UI/routes";
import { User } from "./src/domain/entities/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { Alert } from "react-native";
import { registerTranslation } from "react-native-paper-dates";
import { es } from "react-native-paper-dates";
import { COLORS } from "./src/UI/styles/colors";

export default function App() {
  const [auth, setAuth] = useState(false);

  const handleAuth = async (user: User) => {
    const stringUser = JSON.stringify(user);
    await AsyncStorage.setItem("user", stringUser);

    setAuth(true);
  };

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("company");
    await AsyncStorage.removeItem("cashRegisterId");
    setAuth(false);

    Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente");
  };

  const getAuth = async () => {
    const user = await AsyncStorage.getItem("user");

    if (!user) {
      await AsyncStorage.removeItem("user");
      setAuth(false);
      return;
    }

    setAuth(true);
  };

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.blueIOS,
    },
  };

  registerTranslation("es", es);

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={customTheme}>
        {auth ? (
          <AppRoutes handleLogOut={handleLogOut} />
        ) : (
          <LoginContainer handleAuth={handleAuth} />
        )}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
