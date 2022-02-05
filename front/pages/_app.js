import React from 'react';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

import theme from '../public/common/theme';
import Fonts from '../public/common/fonts';

import wrapper from '../store/configureStore';

// tui-editor
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <Fonts />
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width,
           maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(App);
