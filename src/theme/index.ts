// theme/index.js
import { extendTheme, ThemeConfig } from '@chakra-ui/react';

// Component style overrides
import { Card } from './components/dataDisplay';
import { Menu } from './components/overlay';
import { Input } from './components/forms';
import { Button } from './components/base';

// Colors
const colors = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
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
};

export default extendTheme(overrides);
