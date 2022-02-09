import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AppWrapper } from "../context/state";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppWrapper>
  );
}

export default MyApp;
