import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BillsAndPaymentsProps = StaticScreenProps<undefined>;

export default function BillsAndPayments(
  _props: BillsAndPaymentsProps,
): ReactNode {
  return (
    <SafeAreaView>
      <View>
        <Text>Bills and Payments</Text>
      </View>
    </SafeAreaView>
  );
}
