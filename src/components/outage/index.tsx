import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OutageProps = StaticScreenProps<undefined>;

export default function Outage(_props: OutageProps): ReactNode {
  return (
    <SafeAreaView>
      <View>
        <Text>Outage</Text>
      </View>
    </SafeAreaView>
  );
}
