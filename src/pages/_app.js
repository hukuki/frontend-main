import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChakraProvider } from '@chakra-ui/react';

import '@/styles/globals.css';
import theme from '@/theme';
import { AuthContextProvider } from '../context/AuthContextProvider';

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <AnimatePresence mode="wait" initial={true}>
      <LayoutGroup>
        <AuthContextProvider>{getLayout(<Component {...pageProps} key={router.asPath} />)}</AuthContextProvider>
      </LayoutGroup>
    </AnimatePresence>
  );
}
