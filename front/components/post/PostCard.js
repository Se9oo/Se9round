import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { Flex, Box, Heading, Text, Image, useBreakpointValue } from '@chakra-ui/react';

const PostCard = ({ post }) => {
  const postWidth = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '100%',
    md: 'calc(50% - 1rem)',
    lg: 'calc(50% - 2rem)',
    xl: 'calc(50% - 2rem)',
    xxl: 'calc(33% - 2rem)',
    '2xl': 'calc(33% - 2rem)',
  });

  const margin = useBreakpointValue({
    xxs: '.5rem 0',
    xs: '.5rem 0',
    sm: '.5rem 0',
    md: '.5rem',
    lg: '.5rem',
    xl: '.5rem',
    xxl: '.5rem',
    '2xl': '.5rem',
  });

  return (
    <Flex
      w={postWidth}
      flexDir="column"
      bg="white"
      m={margin}
      p="10px"
      boxShadow="sm"
      borderRadius="md"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-.2rem)',
        transition: 'all .2s ease',
        boxShadow: 'lg',
      }}
    >
      <Box h="200px">
        <Image src={post.thumbnail} />
      </Box>
      <Heading as="h2" fontSize="1.2rem" mb="1rem">
        {post.title}
      </Heading>
      <Heading as="h4" fontSize="1rem" fontWeight="normal" mb="5px" isTruncated>
        {ReactHtmlParser(post.contents)}
      </Heading>
      <Text fontSize="sm">{post.reg_dt}</Text>
    </Flex>
  );
};

export default PostCard;
