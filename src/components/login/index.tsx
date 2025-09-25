import { ReactNode } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import useSession from "@/hooks/use-session";

import backgroundImage from "../../../assets/images/background-image.png";
import smallLogo from "../../../assets/images/logo/logo-small.png";
import StyledButton from "../ui/styled-button";

const BACKGROUND_IMAGE_PATH = Image.resolveAssetSource(backgroundImage).uri;

const SMALL_LOGO_PATH = Image.resolveAssetSource(smallLogo).uri;

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
    <ImageBackground
      source={{ uri: BACKGROUND_IMAGE_PATH }}
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image
          source={{ uri: SMALL_LOGO_PATH }}
          style={styles.logo}
          resizeMode="contain"
        />
        <StyledButton
          title="LOGIN"
          onPress={() => login()}
          variant="info"
          style={styles.loginButton}
        />
        <View style={styles.buttonContainer}>
          <StyledButton title="NEED HELP?" variant="secondary" mode="ghost" />
          <StyledButton title="CREATE LOGIN" variant="secondary" mode="ghost" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 160,
  },
  loginButton: {
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-around",
  },
});
