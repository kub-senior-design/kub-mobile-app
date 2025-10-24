import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NeedHelp from "@/components/login/need-help";
import CreateLogin from "@/components/login/need-help/create-login";
import ForgotPassword from "@/components/login/need-help/forgot-password";
import ForgotUsername from "@/components/login/need-help/forgot-username";
import StartService from "@/components/login/need-help/start-service";
import colors from "@/styles/colors";

const NeedHelpStackNavigator = createNativeStackNavigator({
  screens: {
    NeedHelpScreen: {
      screen: NeedHelp,
    },
    ForgotPasswordScreen: {
      screen: ForgotPassword,
    },
    ForgotUsernameScreen: {
      screen: ForgotUsername,
    },
    CreateLoginScreen: {
      screen: CreateLogin,
    },
    StartServiceScreen: {
      screen: StartService,
    },
  },
  screenOptions: {
    headerTitle: "",
    headerTintColor: colors.white,
    headerStyle: {
      backgroundColor: colors.background,
    },
  },
});

export default NeedHelpStackNavigator;
