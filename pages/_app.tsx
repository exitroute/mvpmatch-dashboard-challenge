import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../context/AppContext";
import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: (arg: any, ...args: any) =>
              fetch(arg, ...args).then((res) => res.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </AppProvider>
  );
}

export default MyApp;
