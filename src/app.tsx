/* eslint-disable unicorn/filename-case */

import {
  DiscoveryDocument,
  makeRedirectUri,
  useAuthRequest,
} from "expo-auth-session";
import { StatusBar } from "expo-status-bar";
import { ReactNode, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import colors from "@/styles/colors";

const tenant = "logintst.kub.org";
const baseUrl = "logintst.kub.org";
const clientId = "16b1b311-463e-4dba-beca-ec561d713f16";

const discovery: DiscoveryDocument = {
  authorizationEndpoint: `https://${baseUrl}/${tenant}/B2C_1_sign_in/oauth2/v2.0/authorize`,
};

export default function App(): ReactNode {
  const [code, setCode] = useState<string | undefined>();
  const redirectUri = makeRedirectUri({
    scheme: "msauth.org.kub.customerapp",
    path: "auth",
  });

  console.log(colors)

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ["openid", "profile", "email"],
      redirectUri,
    },
    discovery,
  );

  useEffect(() => {
    const fetchToken = async (): Promise<void> => {
      if (response?.type === "success") {
        const { code: responseCode } = response.params;

        setCode(responseCode);

        const codeVerifier = request?.codeVerifier;

        if (!codeVerifier) {
          console.error("No code verifier found");
          return;
        }

        const formData = new FormData();

        formData.append("code", responseCode);
        formData.append("client_id", clientId);
        formData.append("grant_type", "authorization_code");
        formData.append("redirect_uri", redirectUri);
        formData.append("code_verifier", codeVerifier);

        const tokenResponse = await fetch(
          "https://tst.kub.org/api/auth/v1/oauth2/v2.0/token/customer",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await tokenResponse.json();

        console.log(data);
      }
    };

    void fetchToken();
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>{tenant}</Text>
      <Text>{baseUrl}</Text>
      <Text>{clientId}</Text>
      <Text>{redirectUri}</Text>
      <Text>{discovery.authorizationEndpoint}</Text>
      <Text>{code}</Text>
      <StatusBar style="auto" />
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          void promptAsync();
        }}
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
});
