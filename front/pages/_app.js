import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

const App = ({ Components, pageProps }) => {
  return (
    <ChakraProvider>
      <Components {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
