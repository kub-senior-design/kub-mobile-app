import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PaymentMethodsProps = StaticScreenProps<undefined>;

export default function PaymentMethods(_props: PaymentMethodsProps): ReactNode {
  return (
    <SafeAreaView>
      <View>
        <Text>Payment Methods</Text>
      </View>
    </SafeAreaView>
  );
}
