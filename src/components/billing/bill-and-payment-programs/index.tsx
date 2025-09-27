import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BillAndPaymentProgramsProps = StaticScreenProps<undefined>;

export default function BillAndPaymentPrograms(
  _props: BillAndPaymentProgramsProps,
): ReactNode {
  return (
    <SafeAreaView>
      <View>
        <Text>Bill and Payment Programs</Text>
      </View>
    </SafeAreaView>
  );
}
