import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';

import PostCard from './PostCard';
import { addClickCountRequestAction } from '../../reducers/post';

import { Box, Grid, Heading, useBreakpointValue } from '@chakra-ui/react';

const RelatedPosts = ({ list }) => {
  const gridTemplate = useBreakpointValue({
    xxs: 'repeat(1, 1fr)',
    xs: 'repeat(1, 1fr)',
    sm: 'repeat(1, 1fr)',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  });

  const dispatch = useDispatch('');

  // 게시글 상세 페이지로 이동
  const handlePostClick = useCallback((postId, postTitle) => {
    // 조회수 add
    dispatch(addClickCountRequestAction({ postId }));

    router.push({
      pathname: `/post/[postTitle]`,
      query: { postTitle },
    });
  }, []);

  return (
    <Box w="100%">
      <Heading
        as="h3"
        fontSize="1.5rem"
        borderLeftColor="brown"
        borderLeftWidth="3px"
        borderLeftStyle="solid"
        mb="1rem"
        p="0 .5rem"
      >
        관련 포스트
      </Heading>
      <Grid gridTemplateColumns={gridTemplate}>
        {list.map((post) => {
          return <PostCard key={post.id} post={post} handlePostClick={handlePostClick} />;
        })}
      </Grid>
    </Box>
  );
};

export default RelatedPosts;
