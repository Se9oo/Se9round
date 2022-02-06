import React from 'react';

import { Flex, Box, Heading, Text, Image, useBreakpointValue, Tag, TagLabel, Divider } from '@chakra-ui/react';

import { ViewIcon } from '@chakra-ui/icons';
import { getDateDiff } from '../../util/common';

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
      _hover={{
        transform: 'translateY(-.5rem)',
        transition: 'all .2s ease',
        boxShadow: 'lg',
      }}
    >
      <Box position="relative" pt="52%" mb="1rem" cursor="pointer">
        {post.thumbnail !== null ? (
          <Image
            src={post.thumbnail}
            alt="thumbnail"
            position="absolute"
            w="100%"
            h="100%"
            top="0"
            left="0"
            objectFit="cover"
          />
        ) : (
          <Image
            src="/assets/images/empty.png"
            alt="empty image"
            position="absolute"
            w="100%"
            h="100%"
            top="0"
            left="0"
            objectFit="cover"
          />
        )}
      </Box>
      <Box mb=".5rem">
        <Heading as="h2" fontSize="1.3rem" mb=".5rem" cursor="pointer">
          {post.title}
        </Heading>
        <Text
          fontSize=".9rem"
          w="100%"
          h="2.5rem"
          mb="1rem"
          textOverflow="ellipsis"
          overflow="hidden"
          wordBreak="break-word"
          noOfLines="2"
          cursor="pointer"
        >
          {post.sub_title}
        </Text>
        <Box position="relative" mb=".5rem" pt="1.5rem">
          <Box position="absolute" top="0" left="0" w="100%" h="100%" overflow="hidden">
            {post.tags.map((tag, idx) => (
              <Tag
                key={`${tag}_${idx}`}
                m=".1rem .5rem .1rem 0"
                cursor="pointer"
                _hover={{ bg: 'rgba(226, 232, 240, .3)' }}
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Box>
        </Box>
      </Box>
      <Divider mb=".5rem" />
      <Flex justifyContent="space-between">
        <Text fontSize=".8rem" color="rgba(0, 0, 0, .5)">
          {getDateDiff(post.reg_dt)}
        </Text>
        <Flex justifyContent="center" alignItems="center">
          <ViewIcon w=".8rem" mr=".3rem" color="brown" />
          <Text fontSize=".8rem" color="rgba(0, 0, 0, .5)">
            {post.click_count}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostCard;
