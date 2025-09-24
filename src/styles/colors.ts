const colors = {
  primary: "#00447c",
  secondary: "#426f9a",

  white: "#ffffff",
  black: "#000000",

  success: "#4b8847",
  info: "#057cff",
  warning: "#ffc107",
  danger: "#dc3545",

  green: "#4b8847",
  orange: "#f70",
  cyan: "#057cff",

  gray: {
    100: "#f8f9fa",
    200: "#e9ecef",
    300: "#dee2e6",
    400: "#ced4da",
    500: "#adb5bd",
    600: "#6c757d",
    700: "#495057",
    800: "#343a40",
    900: "#212529",
  },
} as const;

export type ColorKey = keyof typeof colors;

export default colors;
