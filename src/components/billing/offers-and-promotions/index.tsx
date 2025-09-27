import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OffersAndPromotionsProps = StaticScreenProps<undefined>;

export default function OffersAndPromotions(
  _props: OffersAndPromotionsProps,
): ReactNode {
  return (
    <SafeAreaView>
      <View>
        <Text>Offers and Promotions</Text>
      </View>
    </SafeAreaView>
  );
}
