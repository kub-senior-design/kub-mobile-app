import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StartServiceProps = StaticScreenProps<undefined>;

export default function StartService(_props: StartServiceProps): ReactNode {
  return (
    <SafeAreaView>
      <Text>Start Service</Text>
    </SafeAreaView>
  );
}
