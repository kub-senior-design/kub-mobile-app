import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationType } from "@/types/navigation";

import colors from "../../styles/colors";
import LinkList, { LinkOption } from "../ui/link-list";

type BillingProps = StaticScreenProps<undefined>;

function getBillingLinkOptions(navigation: NavigationType): LinkOption[] {
  return [
    {
      title: "Bills & Payments",
      onPress: () =>
        navigation.navigate("LoggedInTabs", {
          screen: "BillingStack",
          params: { screen: "BillsAndPaymentsScreen" },
        }),
    },
    {
      title: "Payment Methods",
      onPress: () =>
        navigation.navigate("LoggedInTabs", {
          screen: "BillingStack",
          params: { screen: "PaymentMethodsScreen" },
        }),
    },
    {
      title: "Bill & Payment Programs",
      onPress: () =>
        navigation.navigate("LoggedInTabs", {
          screen: "BillingStack",
          params: { screen: "BillAndPaymentProgramsScreen" },
        }),
    },

    {
      title: "Offers and Promotions",
      onPress: () =>
        navigation.navigate("LoggedInTabs", {
          screen: "BillingStack",
          params: { screen: "OffersAndPromotionsScreen" },
        }),
    },
  ];
}

export default function Billing(_props: BillingProps): ReactNode {
  const navigation = useNavigation();

  const billingLinkOptions = getBillingLinkOptions(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Billing</Text>
        <LinkList data={billingLinkOptions} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    color: colors.white,
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
});
