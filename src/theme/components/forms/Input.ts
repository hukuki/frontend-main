import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    color: (props) => (props.colorMode === "dark" ? props.colors.primary["400"] : props.colors.primary["800"]),
    _hover: {
      borderColor: (props) => (props.colorMode === "dark" ? props.colors.primary["400"] : props.colors.primary["800"]),
    },
    _focus: {
      borderColor: (props) => (props.colorMode === "dark" ? props.colors.primary["400"] : props.colors.primary["800"]),
    },
  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });
