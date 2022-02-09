import { ChakraProvider } from "@chakra-ui/react";
import { AppWrapper } from "../context/state";

function MyApp({ Component, pageProps }: AppProps) {
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppWrapper>
}

export default MyApp
