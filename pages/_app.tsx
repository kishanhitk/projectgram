import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import theme from "./../theme/index";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
import React from "react";
import { Provider } from "next-auth/client";

const TopProgressBar = dynamic(
  () => {
    return import("./../components/TopProgressBar");
  },
  { ssr: false }
);
function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <TopProgressBar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
