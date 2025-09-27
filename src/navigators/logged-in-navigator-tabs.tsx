import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Outage from "@/components/outage";
import Profile from "@/components/profile";
import colors from "@/styles/colors";

import BillingStackNavigator from "./billing-stack-navigator";

const LoggedInNavigatorTabs = createBottomTabNavigator({
  initialRouteName: "BillingStack",
  screens: {
    BillingStack: {
      screen: BillingStackNavigator,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "card" : "card-outline"}
            color={color}
            size={size}
          />
        ),
        tabBarLabel: "Billing",
      },
    },
    ProfileScreen: {
      screen: Profile,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "person" : "person-outline"}
            color={color}
            size={size}
          />
        ),
        tabBarLabel: "Account",
      },
    },
    OutageScreen: {
      screen: Outage,
      options: {
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "warning" : "warning-outline"}
            color={color}
            size={size}
          />
        ),
        tabBarLabel: "Outages",
      },
    },
  },
  screenOptions: {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: colors.background,
    },
    tabBarActiveTintColor: colors.secondary,
    tabBarInactiveTintColor: colors.secondaryEmphasis,
  },
});

export default LoggedInNavigatorTabs;
