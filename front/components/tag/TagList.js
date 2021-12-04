import React from 'react';

import { Flex, Heading } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';

import Tag from './Tag';

const TagList = () => {
  const display = useBreakpointValue({
    xxs: 'none',
    xs: 'none',
    sm: 'none',
    md: 'none',
    lg: 'block',
    xl: 'block',
    xxl: 'block',
    '2xl': 'block',
  });

  return (
    <Flex w="20%" display={display} flexDir="column" p="10px">
      <Heading as="h2" fontSize="2rem" p="10px">
        TagList
      </Heading>
      <Flex w="100%">
        <Tag />
        <Tag />
        <Tag />
      </Flex>
    </Flex>
  );
};

export default TagList;
