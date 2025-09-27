/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */

import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useIsSignedIn, useIsSignedOut } from "@/hooks/use-is-signed-in";
import LoggedInNavigatorTabs from "@/navigators/logged-in-navigator-tabs";

import { LoggedOutStackNavigator } from "./logged-out-stack-navigator";

const RootStack = createNativeStackNavigator({
  screens: {
    LoggedInTabs: {
      if: useIsSignedIn,
      screen: LoggedInNavigatorTabs,
    },
    LoggedOutStack: {
      if: useIsSignedOut,
      screen: LoggedOutStackNavigator,
    },
  },
  screenOptions: {
    headerShown: false,
  },
});

const RootNavigator = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default RootNavigator;
