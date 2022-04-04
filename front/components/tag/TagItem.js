import React from 'react';
import { Box, Tag, TagLabel } from '@chakra-ui/react';

const TagItem = ({ tag, handleSearchTag, mode }) => {
  return (
    <Box m=".1rem .4rem .1rem 0">
      <Tag
        bgColor={mode === 'search' ? 'gray.300' : 'brown'}
        borderRadius="0"
        color={mode === 'search' ? 'black' : 'white'}
        cursor="pointer"
        _hover={mode === 'search' ? { bgColor: 'brown', color: 'white' } : { bgColor: 'gray.300', color: 'black' }}
        _active={{ bgColor: 'gray.200', color: 'black' }}
        transition="all .2s ease"
        onClick={() => handleSearchTag(tag)}
      >
        <TagLabel>{tag}</TagLabel>
      </Tag>
    </Box>
  );
};

export default TagItem;
