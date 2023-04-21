import { defineStyleConfig } from '@chakra-ui/react';

export const buttonTheme = defineStyleConfig({
  // Styles for the base style
  baseStyle: {
    fontFamily: 'Poppins',
    cursor: 'pointer',
    transition: 'all .2s ease-in',
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'primary.400',
      background: 'none',
      _hover: {
        bgColor: 'primary.500',
      },
    },
    solid: {
      bgColor: 'primary.400',
      color: (props) => props.colors.text.primaryLight,
      cursor: 'pointer',
      transition: 'all .2s ease',
      _hover: {
        bgColor: 'primary.600',
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    variant: 'solid',
  },
});
