import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ForgotUsernameProps = StaticScreenProps<undefined>;

export default function ForgotUsername(_props: ForgotUsernameProps): ReactNode {
  return (
    <SafeAreaView>
      <Text>Forgot Username</Text>
    </SafeAreaView>
  );
}
