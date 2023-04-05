import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css';
import theme from '@/theme';
import { AuthContextProvider } from '../context/AuthContextProvider';

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AnimatePresence mode="wait" initial={false}>
          <LayoutGroup>
            <AuthContextProvider>
              <Component {...pageProps} key={router.asPath} />
            </AuthContextProvider>
          </LayoutGroup>
        </AnimatePresence>
      </ChakraProvider>
    </SessionProvider>
  );
}
