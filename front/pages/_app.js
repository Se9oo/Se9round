import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';

import theme from '../public/common/theme';
import Fonts from '../public/common/fonts';

import wrapper from '../store/configureStore';

// tui-editor
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { checkIsAdminRequestAction } from '../reducers/user';

const Se9round = ({ Component, pageProps }) => {
  const dispatch = useDispatch('');

  useEffect(() => {
    dispatch(checkIsAdminRequestAction());
  }, []);

  return (
    <ChakraProvider theme={theme} resetCSS>
      <Fonts />
      <Head>
        <title>Se9round.dev</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width,
           maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <meta name="description" content="se9oo의 개발 블로그" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default wrapper.withRedux(Se9round);
