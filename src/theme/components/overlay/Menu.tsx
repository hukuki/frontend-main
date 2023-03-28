import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys);

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    bg: "transparent",
    color: (props) => (props.colorMode === "dark" ? props.colors.primary["400"] : props.colors.primary["700"]),
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "25px",
  },
});

// export the component theme
export const menuTheme = defineMultiStyleConfig({
  baseStyle,
});

export default menuTheme;
