import React from 'react';
import { Box, Tag, TagLabel } from '@chakra-ui/react';

const TagItem = ({ tag }) => {
  return (
    <Box m=".2rem">
      <Tag
        bgColor="gray.300"
        borderRadius="0"
        cursor="pointer"
        _hover={{ bgColor: 'brown', color: 'white' }}
        _active={{ bgColor: 'gray.200', color: 'black' }}
        transition="all .2s ease"
      >
        <TagLabel p=".3rem">{tag.name}</TagLabel>
      </Tag>
    </Box>
  );
};

export default TagItem;
