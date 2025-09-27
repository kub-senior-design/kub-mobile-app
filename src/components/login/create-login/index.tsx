import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CreateLoginProps = StaticScreenProps<undefined>;

export default function CreateLogin(_props: CreateLoginProps): ReactNode {
  return (
    <SafeAreaView>
      <View>
        <Text>Create Login</Text>
      </View>
    </SafeAreaView>
  );
}
