import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../public/common/theme';

const App = ({ Components, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Components {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
