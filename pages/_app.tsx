import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../context/AppContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <SWRConfig
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </AppProvider>
  );
}

export default MyApp;
