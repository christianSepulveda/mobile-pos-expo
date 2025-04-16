import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "../styles/colors";
import HistoryContainer from "../containers/history";
import SellIndex from "../containers/sell";
import OptionContainer from "../containers/options";
import CashRegisterContainer from "../containers/cash-register";
import ProductsContainer from "../containers/products";

type Props = {
  handleLogOut: () => void;
};

const Tab = createBottomTabNavigator();

const AppRoutes = (props: Props) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Vender"
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: COLORS.whiteSmoke },
          tabBarActiveTintColor: COLORS.blueIOS,
          tabBarInactiveTintColor: COLORS.grayDark,
          tabBarLabelStyle: { fontSize: 10, fontFamily: "500" },
        }}
      >
        <Tab.Screen
          name="Ventas"
          component={HistoryContainer}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name="cart"
                color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Caja"
          component={CashRegisterContainer}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name="cash"
                color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Vender"
          component={SellIndex}
          options={{
            tabBarIcon: (props) => (
              <FontAwesome
                name="dollar"
                color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Productos"
          component={ProductsContainer}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name="bag"
                color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                size={25}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Opciones"
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name="options"
                color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                size={25}
              />
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
