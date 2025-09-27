import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NeedHelp from "@/components/login/need-help";
import colors from "@/styles/colors";

const NeedHelpStackNavigator = createNativeStackNavigator({
  screens: {
    NeedHelpScreen: {
      screen: NeedHelp,
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
