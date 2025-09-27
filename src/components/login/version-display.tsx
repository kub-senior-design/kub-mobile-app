import { nativeApplicationVersion } from "expo-application";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "@/styles/colors";
import { ENVIRONMENT } from "@/utils/constants/environment";

const getFormattedVersion = (): string => {
  return `v${nativeApplicationVersion}`;
};

const getEnvironmentName = (): string => {
  if (ENVIRONMENT === "prod") {
    return "";
  }

  const uppercaseEnvironment = ENVIRONMENT.toUpperCase();

  return uppercaseEnvironment;
};

export default function VersionDisplay(): ReactNode {
  const formattedVersion = getFormattedVersion();
  const environmentName = getEnvironmentName();

  return (
    <View style={styles.container}>
      <Text style={styles.versionText}>{formattedVersion}</Text>
      <Text style={styles.environmentText}>{environmentName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // center it horizontally
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 36,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  versionText: {
    color: colors.white,
  },
  environmentText: {
    color: colors.danger,
  },
});
