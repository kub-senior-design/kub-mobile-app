import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ForgotPasswordProps = StaticScreenProps<undefined>;

export default function ForgotPassword(_props: ForgotPasswordProps): ReactNode {
  return (
    <SafeAreaView>
      <Text>Forgot Password</Text>
    </SafeAreaView>
  );
}
