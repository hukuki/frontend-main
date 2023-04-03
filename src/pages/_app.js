import { AnimatePresence, LayoutGroup } from "framer-motion";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import theme from "@/theme";
import { UserContextProvider } from "../context/UserContextProvider";

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AnimatePresence mode="wait" initial={false}>
          <UserContextProvider>
            <LayoutGroup>
              <Component {...pageProps} key={router.asPath} />
            </LayoutGroup>
          </UserContextProvider>
        </AnimatePresence>
      </ChakraProvider>
    </SessionProvider>
  );
}