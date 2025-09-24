import { ReactNode } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import useSession from "@/hooks/use-session";

export default function Login(): ReactNode {
  const { login, logout, user } = useSession();

  if (user) {
    return (
      <View style={styles.container}>
        <Text>Logged in</Text>
        <Text>{JSON.stringify(user, null, 2)}</Text>
        <Button title="Logout" onPress={() => logout()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Login" onPress={() => login()} />
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
});
