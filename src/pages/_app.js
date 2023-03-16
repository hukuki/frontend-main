import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import Footer from './components/footer'
import Navigation from './components/navigation'

const theme = extendTheme({
  colors: {
    main: {
      primary: "#ec8936",
      // ...
      secondary: "#DD6B20",
    },
  },
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return <SessionProvider session={session}>
    <ChakraProvider theme={theme}>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  </SessionProvider>
}
