import { AnimatePresence, LayoutGroup } from "framer-motion";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";

import theme from "@/theme";
import Script from "next/script";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <GoogleOAuthProvider clientId="526028600216-1lj0emenr0knupohge4rr6kvu33jbkde.apps.googleusercontent.com">
        <AnimatePresence mode="wait" initial={false}>
          <LayoutGroup>
            <Component {...pageProps} key={router.asPath} />
          </LayoutGroup>
        </AnimatePresence>
        </GoogleOAuthProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}