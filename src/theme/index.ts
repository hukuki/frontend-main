// theme/index.js
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Component style overrides
import { Card } from "./components/dataDisplay";
import { Menu } from "./components/overlay";
import { Input } from "./components/forms";

// Colors
const colors = {
  dark: {
    50: "#DEF4FF",
    100: "#B0DDFF",
    200: "#82C5FC",
    300: "#52ADF7",
    400: "#2596F4",
    500: "#0B7DDA",
    600: "#0061AB",
    700: "#00457B",
    800: "#002A4D",
    900: "#000F1F",
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
    Input,
    Card,
    // Other components go here
  },
  config,
  colorMode: "dark",
};

export default extendTheme(overrides);
