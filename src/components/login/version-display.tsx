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
    alignItems: "center",
    bottom: 36,
    justifyContent: "flex-end",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  environmentText: {
    color: colors.danger,
  },
  versionText: {
    color: colors.white,
  },
});
