import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Billing from "@/components/billing";
import BillAndPaymentPrograms from "@/components/billing/bill-and-payment-programs";
import BillsAndPayments from "@/components/billing/bills-and-payments";
import OffersAndPromotions from "@/components/billing/offers-and-promotions";
import PaymentMethods from "@/components/billing/payment-methods";

const BillingStackNavigator = createNativeStackNavigator({
  initialRouteName: "BillingScreen",
  screens: {
    BillingScreen: {
      screen: Billing,
      options: {
        headerShown: false,
      },
    },
    BillsAndPaymentsScreen: {
      screen: BillsAndPayments,
    },
    PaymentMethodsScreen: {
      screen: PaymentMethods,
    },
    BillAndPaymentProgramsScreen: {
      screen: BillAndPaymentPrograms,
    },
    OffersAndPromotionsScreen: {
      screen: OffersAndPromotions,
    },
  },
});

export default BillingStackNavigator;
