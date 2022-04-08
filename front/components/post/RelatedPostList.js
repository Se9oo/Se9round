import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import PostList from './PostList';

const RelatedPostList = ({ postList }) => {
  return (
    <Box mt="16rem">
      <Heading
        as="h3"
        fontSize="1.5rem"
        borderLeftColor="brown"
        borderLeftWidth="3px"
        borderLeftStyle="solid"
        mb="1rem"
        p="0 .5rem"
      >
        관련 게시글
      </Heading>
      {postList && postList.length > 0 ? (
        <PostList postList={postList} postKind="relatedPost" />
      ) : (
        <Flex flexDir="column" p="5rem 0" justifyContent="center" alignItems="center">
          <Text fontSize="2rem">🙅‍♂️</Text>
          <Text fontSize="1rem">관련된 게시글이 없습니다.</Text>
        </Flex>
      )}
    </Box>
  );
};

export default RelatedPostList;
