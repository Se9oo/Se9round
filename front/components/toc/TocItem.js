import React from 'react';

import { Box, Text } from '@chakra-ui/react';

const TocItem = ({ header, selectedTocItem, handleTocItem }) => {
  const { href, text, count } = header;

  return (
    <Box ml={`${count}rem`}>
      <Text
        color={selectedTocItem === href ? 'brown' : 'gray.500'}
        fontSize=".8rem"
        fontWeight={selectedTocItem === href ? '600' : '500'}
        transform={selectedTocItem === href ? 'scale(1.05)' : 'scale(1)'}
        transition="all .1s ease"
        _hover={selectedTocItem !== href && { color: 'black' }}
        wordBreak="break-all"
      >
        <a href={href} onClick={(e) => handleTocItem(e, href)}>
          {text}
        </a>
      </Text>
    </Box>
  );
};

export default TocItem;
