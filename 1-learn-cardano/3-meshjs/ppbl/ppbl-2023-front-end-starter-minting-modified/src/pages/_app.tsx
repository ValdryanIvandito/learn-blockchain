import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import { PPBLContextProvider } from "../context/PPBLContext";

import "@fontsource/open-sans";

const theme = extendTheme({
  colors: {
    theme: {
      dark: "#1c2634",
      light: "#DDD8C4",
      yellow: "#EBBA6F",
      orange: "#F6713C",
    },
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', serif`,
  },
  components: {
    Link: {
      baseStyle: {
        color: "theme.yellow"
      }
    }
  }
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <PPBLContextProvider>
            <Box bg="theme.dark" color="theme.light" minH="100vh">
              <Component {...pageProps} />
            </Box>
          </PPBLContextProvider>
        </ChakraProvider>
      </ApolloProvider>
    </MeshProvider>
  );
}

export default MyApp;
