import { ReactNode, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputContentSizeChangeEvent,
  TextInputProps,
  View,
} from "react-native";

import colors from "@/styles/colors";

const PLACEHOLDER_TEXT_COLOR = "rgba(255,255,255,0.7)";
const MINIMUM_MULTILINE_HEIGHT = 80;

type StyledTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  multiline?: boolean;
};

export default function StyledTextInput({
  label,
  error,
  style,
  multiline = false,
  ...props
}: StyledTextInputProps): ReactNode {
  const [inputHeight, setInputHeight] = useState(0);

  const handleContentSizeChange = (
    event: TextInputContentSizeChangeEvent,
  ): void => {
    setInputHeight(
      Math.max(MINIMUM_MULTILINE_HEIGHT, event.nativeEvent.contentSize.height),
    );
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        style={[
          styles.input,
          multiline && {
            minHeight: MINIMUM_MULTILINE_HEIGHT,
            height: Math.max(MINIMUM_MULTILINE_HEIGHT, inputHeight),
          },
          style,
        ]}
        placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
        cursorColor={colors.white}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "auto"}
        onContentSizeChange={multiline ? handleContentSizeChange : undefined}
        {...props}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    marginTop: 4,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
});
