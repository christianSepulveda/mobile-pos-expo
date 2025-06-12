import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "../styles/colors";
import HistoryContainer from "../containers/history";
import SellIndex from "../containers/sell";
import OptionContainer from "../containers/options";
import CashRegisterContainer from "../containers/cash-register";
import ProductsContainer from "../containers/products";
import { View } from "react-native";
import AppText from "../components/atoms/AppText";
import { useSelector } from "react-redux";
import { useEffect } from "react";

type Props = {
  handleLogOut: () => void;
};

const Tab = createBottomTabNavigator();

const AppRoutes = (props: Props) => {
  const isAuthorized = useSelector(
    (state: any) => state.authReducer.isAuthorized
  );

  useEffect(() => {
    if (!isAuthorized) props.handleLogOut();
  }, [isAuthorized]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Vender"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.whiteSmoke,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: COLORS.blueIOS,
          tabBarInactiveTintColor: COLORS.grayDark,
          tabBarLabelStyle: { fontSize: 10, fontFamily: "500" },
        }}
      >
        <Tab.Screen
          name="Ventas"
          component={HistoryContainer}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => (
              <View
                style={{
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  ...(props.focused && {
                    backgroundColor: COLORS.blueIosOpacity,
                    borderRadius: 10,
                  }),
                }}
              >
                <Ionicons
                  name="cart-outline"
                  color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                  size={25}
                />

                <AppText
                  type="medium"
                  style={{
                    color: props.focused ? COLORS.blueIOS : COLORS.grayDark,
                    fontSize: 10,
                  }}
                  children="Ventas"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Caja"
          component={CashRegisterContainer}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => (
              <View
                style={{
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  ...(props.focused && {
                    backgroundColor: COLORS.blueIosOpacity,
                    borderRadius: 10,
                  }),
                }}
              >
                <Ionicons
                  name="cash-outline"
                  color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                  size={25}
                />

                <AppText
                  type="medium"
                  style={{
                    color: props.focused ? COLORS.blueIOS : COLORS.grayDark,
                    fontSize: 10,
                  }}
                  children="Caja"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Vender"
          component={SellIndex}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => (
              <View
                style={{
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  ...(props.focused && {
                    backgroundColor: COLORS.blueIosOpacity,
                    borderRadius: 10,
                  }),
                }}
              >
                <FontAwesome
                  name="dollar"
                  color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                  size={25}
                />

                <AppText
                  type="medium"
                  style={{
                    color: props.focused ? COLORS.blueIOS : COLORS.grayDark,
                    fontSize: 10,
                  }}
                  children="Vender"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Productos"
          component={ProductsContainer}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => (
              <View
                style={{
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 58,
                  height: 58,
                  ...(props.focused && {
                    backgroundColor: COLORS.blueIosOpacity,
                    borderRadius: 10,
                  }),
                }}
              >
                <Ionicons
                  name="bag-outline"
                  color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                  size={25}
                />

                <AppText
                  type="medium"
                  style={{
                    color: props.focused ? COLORS.blueIOS : COLORS.grayDark,
                    fontSize: 10,
                  }}
                  children="Productos"
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Opciones"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: (props) => (
              <View
                style={{
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 55,
                  height: 55,
                  ...(props.focused && {
                    backgroundColor: COLORS.blueIosOpacity,
                    borderRadius: 10,
                  }),
                }}
              >
                <Ionicons
                  name="options-outline"
                  color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                  size={25}
                />

                <AppText
                  type="medium"
                  style={{
                    color: props.focused ? COLORS.blueIOS : COLORS.grayDark,
                    fontSize: 10,
                  }}
                  children="Opciones"
                />
              </View>
            ),
          }}
        >
          {() => <OptionContainer handleLogOut={props.handleLogOut} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
