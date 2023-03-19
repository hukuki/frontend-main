import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    bg: (props) => (props.colorMode === "dark" ? props.colors.dark.secondary : props.colors.light.secondary),
    borderRadius: "25px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
  },
});

export const cardTheme = defineMultiStyleConfig({ baseStyle });
