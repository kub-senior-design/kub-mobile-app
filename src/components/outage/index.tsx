import { StaticScreenProps } from "@react-navigation/native";
import { ReactNode } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useOutageData from "@/api/outage/use-outage-data";
import useSession from "@/hooks/use-session";

type OutageProps = StaticScreenProps<undefined>;

export default function Outage(_props: OutageProps): ReactNode {
  const { apiClient } = useSession();

  const { data, isLoading } = useOutageData(apiClient);

  if (isLoading || !data) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  const [outageData, outageDataError] = data;

  if (outageDataError !== null) {
    return (
      <SafeAreaView>
        <Text>Error</Text>
      </SafeAreaView>
    );
  }

  const electricOutages = outageData.electricOutages;

  return (
    <SafeAreaView>
      <View>
        {electricOutages.map((electricOutage) => (
          <Text key={electricOutage.id}>
            {JSON.stringify(electricOutage, null, 2)}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}
