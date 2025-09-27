import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NeedHelpProps = StaticScreenProps<undefined>;

export default function NeedHelp(_props: NeedHelpProps): ReactNode {
  return (
    <SafeAreaView>
      <View>
        <Text>Need Help</Text>
      </View>
    </SafeAreaView>
  );
}
