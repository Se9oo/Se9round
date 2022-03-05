import React from 'react';

import { Box } from '@chakra-ui/react';

const TocItem = ({ header }) => {
  const { href, text, count } = header;

  return (
    <Box ml={`${count / 2}rem`}>
      <a href={href}>{text}</a>
    </Box>
  );
};

export default TocItem;
