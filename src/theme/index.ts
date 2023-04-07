// theme/index.js
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Component style overrides
import { Card } from './components/dataDisplay';
import { Menu } from './components/overlay';
import { Input } from './components/forms';
import { Button } from './components/base';

// Colors
const colors = {
  primary: {
    50: '#DEF4FF',
    100: '#B0DDFF',
    200: '#82C5FC',
    300: '#52ADF7',
    400: '#2596F4',
    500: '#0B7DDA',
    600: '#0061AB',
    700: '#00457B',
    800: '#002A4D',
    900: '#000F1F',
  },
  background: {
    dark: '#000',
    light: '#FAFAFA',
  },
  container: {
    dark: '#0D0D0D',
    light: '#FFFFFF',
  },
  text: {
    primaryLight: '#FFFFFF',
    secondaryLight: '#E6E6E6',
    ternaryLight: '#CCCCCC',
    primaryDark: '#000F1F',
    secondaryDark: '#002752',
    ternaryDark: '#004085',
  },
  grey: {
    50: '#F1F1F3',
    100: '#D5D5D7',
    200: '#BABABE',
    300: '#9F9FA6',
    400: '#83838E',
    500: '#696974',
    600: '#52525A',
    700: '#3B3B40',
    800: '#232326',
    900: '#0C0C0E',
  },
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const overrides = {
  colors,
  components: {
    Menu,
    Input,
    Card,
    // Other components go here
    Button,
  },
  config,
  colorMode: 'dark',
};

export default extendTheme(overrides);
