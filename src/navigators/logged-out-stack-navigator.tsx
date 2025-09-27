import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "@/components/login";
import CreateLogin from "@/components/login/create-login";
import colors from "@/styles/colors";

import NeedHelpStackNavigator from "./need-help-stack-navigator";

export const LoggedOutStackNavigator = createNativeStackNavigator({
  screens: {
    LoginScreen: {
      screen: Login,
    },
    NeedHelpStack: {
      screen: NeedHelpStackNavigator,
    },
    CreateLoginScreen: {
      screen: CreateLogin,
      options: {
        headerShown: true,
        headerTitle: "",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.background,
        },
      },
    },
  },
  screenOptions: {
    headerShown: false,
  },
});
export default LoggedOutStackNavigator;
