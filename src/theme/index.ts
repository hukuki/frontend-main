// theme/index.js
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Component style overrides
import { Menu } from "./components/overlay";

// Colors
const colors = {
  dark: {
    primary: "#25274D",
    secondary: "#E9EBEE",
    tertiary: "#C4C4C4",
    quaternary: "#4E005E",
    quinary: "#00BFBF",
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const overrides = {
  colors,
  components: {
    Menu,
    // Other components go here
  },
  config,
  colorMode: "dark",
};

export default extendTheme(overrides);
