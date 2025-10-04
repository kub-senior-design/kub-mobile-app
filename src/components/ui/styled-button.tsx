import { ReactNode } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import colors, { ColorKey } from "@/styles/colors";

type ButtonVariant = ColorKey;

type ButtonMode = "solid" | "outline" | "ghost";

type StyledButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  mode?: ButtonMode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
};

export default function StyledButton({
  title,
  onPress,
  variant = "primary",
  mode = "solid",
  style,
  textStyle,
  disabled = false,
  loading = false,
}: StyledButtonProps): ReactNode {
  const isDisabled = disabled || loading;

  const backgroundColor = mode === "solid" ? colors[variant] : "transparent";

  const borderColor = mode === "outline" ? colors[variant] : "transparent";

  const textColor = mode === "solid" ? colors.white : colors[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        defaultStyles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth: mode === "outline" ? 2 : 0,
          opacity: isDisabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={[defaultStyles.text, { color: textColor }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const defaultStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
