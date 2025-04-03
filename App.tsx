import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";

import LoginContainer from "./src/UI/containers/auth";
import AppRoutes from "./src/UI/routes";
import { User } from "./src/domain/entities/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);
  const [auth, setAuth] = useState(false);

  const handleAuth = async (user: User) => {
    const stringUser = JSON.stringify(user);
    await AsyncStorage.setItem("user", stringUser);

    setLoggedUser(user);
    setAuth(true);
  };

  const getAuth = async () => {
    const user = await AsyncStorage.getItem("user");

    if (!user) {
      await AsyncStorage.removeItem("user");
      setAuth(false);
      return;
    }

    const parsedUser = JSON.parse(user) as User;
    setLoggedUser(parsedUser);
    setAuth(true);
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        {auth ? <AppRoutes /> : <LoginContainer handleAuth={handleAuth} />}
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
