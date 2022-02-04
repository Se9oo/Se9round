import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { Flex, Box, Heading, Text, Image, useBreakpointValue, Tag, TagLabel } from '@chakra-ui/react';

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
      <Flex justifyContent="center" alignItems="center" mb="1rem">
        {post.thumbnail !== null ? (
          <Image src={post.thumbnail} />
        ) : (
          <Image src="/assets/images/empty.png" alt="empty image" />
        )}
      </Flex>
      <Box>
        <Heading as="h2" fontSize="1.2rem" mb="1rem">
          {post.title}
        </Heading>
        <Heading as="h4" fontSize="1rem" fontWeight="normal" mb="1rem" isTruncated>
          {ReactHtmlParser(post.contents)}
        </Heading>
        <Box mb=".5rem">
          {post.tags.map((tag, idx) => (
            <Tag key={`${tag}_${idx}`} m=".1rem .5rem .1rem 0">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </Box>
        <Text fontSize="sm">{post.reg_dt}</Text>
      </Box>
    </Flex>
  );
};

export default PostCard;
