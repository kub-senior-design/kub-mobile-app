import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import useSession from "@/hooks/use-session";

import StyledButton from "../ui/styled-button";

export default function Login(): ReactNode {
  const { login, logout, user } = useSession();

  if (user) {
    return (
      <View style={styles.container}>
        <Text>Logged in</Text>
        <Text>{JSON.stringify(user, null, 2)}</Text>
        <StyledButton title="Logout" onPress={() => logout()} variant="info" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <StyledButton
        title="Login"
        onPress={() => login()}
        variant="info"
        loading={true}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "75%",
  },
});
