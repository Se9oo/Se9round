import React from 'react';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../public/common/theme';

const App = ({ Components, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width,
           maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>
      <Components {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
