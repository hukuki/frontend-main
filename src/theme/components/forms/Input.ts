import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    color: (props) => (props.colorMode === "dark" ? props.colors.dark.primary : props.colors.light.primary),
    _hover: {
      borderColor: (props) => (props.colorMode === "dark" ? props.colors.dark.quaternary : props.colors.light.quaternary),
    },
    _focus: {
      borderColor: (props) => (props.colorMode === "dark" ? props.colors.dark.quaternary : props.colors.light.quaternary),
    },
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
