import { NavigationProp, NavigationState } from "@react-navigation/native";

// This type comes from the useNavigation hook of @react-navigation/native
// Use it to pass it the navigator to other functions or components
export type NavigationType = Omit<
  NavigationProp<ReactNavigation.RootParamList>,
  "getState"
> & {
  getState(): NavigationState | undefined;
};
