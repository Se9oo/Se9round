import React from 'react';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../public/common/theme';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width,
           maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
