import React from 'react';

import { Flex, Heading } from '@chakra-ui/layout';

import Tag from './Tag';

const TagList = () => {
  return (
    <Flex w="20%" flexDir="column" p="10px">
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
