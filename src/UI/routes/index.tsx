import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import ProductListContainer from "../containers/product/product-list-container";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "../styles/colors";
import HistoryContainer from "../containers/history";

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Ventas"
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
          name="Vender"
          component={ProductListContainer}
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
          name="Categorías"
          component={ProductListContainer}
          options={{
            tabBarIcon: (props) => (
              <Ionicons
                name="list"
                color={props.focused ? COLORS.blueIOS : COLORS.grayDark}
                size={25}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
