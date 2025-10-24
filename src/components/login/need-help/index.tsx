import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LinkList, { LinkOption } from "@/components/ui/link-list";
import { NavigationType } from "@/types/navigation";

type NeedHelpProps = StaticScreenProps<undefined>;

function getNeedHelpLinkOptions(navigation: NavigationType): LinkOption[] {
  return [
    {
      title: "Forgot Password",
      onPress: () =>
        navigation.navigate("LoggedOutStack", {
          screen: "NeedHelpStack",
          params: { screen: "ForgotPasswordScreen" as const },
        }),
    },
    {
      title: "Forgot Username",
      onPress: () =>
        navigation.navigate("LoggedOutStack", {
          screen: "NeedHelpStack",
          params: { screen: "ForgotUsernameScreen" as const },
        }),
    },
    {
      title: "Create Login",
      onPress: () =>
        navigation.navigate("LoggedOutStack", {
          screen: "NeedHelpStack",
          params: { screen: "CreateLoginScreen" as const },
        }),
    },
    {
      title: "Start Service",
      onPress: () =>
        navigation.navigate("LoggedOutStack", {
          screen: "NeedHelpStack",
          params: { screen: "StartServiceScreen" as const },
        }),
    },
  ];
}

export default function NeedHelp(_props: NeedHelpProps): ReactNode {
  const navigation = useNavigation();

  const needHelpLinkOptions: LinkOption[] = getNeedHelpLinkOptions(navigation);

  return (
    <SafeAreaView>
      <View>
        <Text>Need Help</Text>
        <LinkList data={needHelpLinkOptions} />
      </View>
    </SafeAreaView>
  );
}
