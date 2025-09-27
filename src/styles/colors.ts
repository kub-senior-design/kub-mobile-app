const colors = {
  background: "#0a1d36",
  backgroundSecondary: "#0c1827",

  primary: "#00447c",
  primaryEmphasis: "#668fb0",

  secondary: "#94add2",
  secondaryEmphasis: "#97bddc",

  link: "#aed5fe",
  linkHover: "#94add2",

  white: "#ffffff",
  black: "#000000",

  success: "#4b8847",
  info: "#057cff",
  warning: "#ffc107",
  danger: "#dc3545",

  green: "#4b8847",
  orange: "#f70",
  cyan: "#057cff",

  gray: "#3a3a3a",
} as const;

export type ColorKey = keyof typeof colors;

export default colors;
