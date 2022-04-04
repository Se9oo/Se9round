import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { getDateFormatToKor } from '../../util/common';
import TagList from '../tag/TagList';
import PostAndToc from './PostAndToc';

const PostViewer = ({ title, contents, tags, reg_dt }) => {
  return (
    <Box w="100%" bg="white" m="0 auto 5rem auto" p="1.5rem">
      <Flex w="100%" flexDir="column" justifyContent="center" alignItems="center">
        <Heading as="h1" fontSize="2.5rem" mb="2rem">
          {title}
        </Heading>
        <Box mb="1rem">
          <TagList tagList={tags} />
        </Box>
        <Text color="gray.400" mb="2rem">
          {getDateFormatToKor(reg_dt)}
        </Text>
      </Flex>
      <Box position="relative">
        <PostAndToc title={title} contents={contents} />
      </Box>
    </Box>
  );
};

export default PostViewer;
