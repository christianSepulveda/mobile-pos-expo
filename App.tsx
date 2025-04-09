import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

import LoginContainer from "./src/UI/containers/auth";
import AppRoutes from "./src/UI/routes";
import { User } from "./src/domain/entities/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import { Alert } from "react-native";

export default function App() {
  const [auth, setAuth] = useState(false);

  const handleAuth = async (user: User) => {
    const stringUser = JSON.stringify(user);
    await AsyncStorage.setItem("user", stringUser);

    setAuth(true);
  };

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("user");
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

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        {auth ? (
          <AppRoutes handleLogOut={handleLogOut} />
        ) : (
          <LoginContainer handleAuth={handleAuth} />
        )}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
