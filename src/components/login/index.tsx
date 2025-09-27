import { StaticScreenProps, useNavigation } from "@react-navigation/native";
import { ReactNode } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";

import useSession from "@/hooks/use-session";

import backgroundImage from "../../../assets/images/background-image.png";
import smallLogo from "../../../assets/images/logo/logo-small.png";
import StyledButton from "../ui/styled-button";
import VersionDisplay from "./version-display";

const BACKGROUND_IMAGE_PATH = Image.resolveAssetSource(backgroundImage).uri;

const SMALL_LOGO_PATH = Image.resolveAssetSource(smallLogo).uri;

type LoginProps = StaticScreenProps<undefined>;

export default function Login(_props: LoginProps): ReactNode {
  const { isAuthenticating, login } = useSession();
  const navigation = useNavigation();

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
          onPress={login}
          variant="info"
          style={styles.loginButton}
          loading={isAuthenticating}
        />
        <View style={styles.buttonContainer}>
          <StyledButton
            title="NEED HELP?"
            variant="link"
            mode="ghost"
            onPress={() =>
              navigation.navigate("LoggedOutStack", { screen: "NeedHelpStack" })
            }
          />
          <StyledButton
            title="CREATE LOGIN"
            variant="link"
            mode="ghost"
            onPress={() =>
              navigation.navigate("LoggedOutStack", {
                screen: "CreateLoginScreen",
              })
            }
          />
        </View>
      </View>
      <VersionDisplay />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    width: "100%",
    height: "100%",
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
    marginTop: 12,
  },
});
