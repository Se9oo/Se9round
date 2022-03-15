import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { Flex, Box, Heading, Text, Image, useBreakpointValue, Tag, TagLabel, Divider } from '@chakra-ui/react';

import { ViewIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getCountFormat, getDateDiff } from '../../util/common';

const PostCard = memo(({ post, handlePostClick, handlePostCancel, handlePostModify, mode }) => {
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

  const { isAdmin } = useSelector((state) => state.user);

  return (
    <Flex
      flexDir="column"
      bg="white"
      m={margin}
      boxShadow="sm"
      borderRadius="md"
      _hover={{
        transform: 'translateY(-.5rem)',
        boxShadow: 'lg',
      }}
      transition="all .3s ease"
    >
      <Box
        position="relative"
        pt="52%"
        mb=".5rem"
        cursor="pointer"
        onClick={() => handlePostClick(post.id, post.title)}
      >
        <Image
          src={post.thumbnail !== null ? post.thumbnail : '/assets/images/empty.png'}
          alt={post.thumbnail !== null ? 'thumbnail' : 'empty image'}
          position="absolute"
          w="100%"
          h="100%"
          top="0"
          left="0"
          objectFit="cover"
        />
      </Box>
      <Box mb=".5rem" p="1rem">
        <Heading
          as="h2"
          fontSize="1.3rem"
          mb=".5rem"
          cursor="pointer"
          onClick={() => handlePostClick(post.id, post.title)}
        >
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
          onClick={() => handlePostClick(post.id, post.title)}
        >
          {post.sub_title}
        </Text>
        <Box position="relative" mb=".5rem" pt="1.5rem">
          <Box>
            {post.tags.map((tag, idx) => (
              <Tag
                key={`${tag}_${idx}`}
                m="0 .1rem"
                cursor="pointer"
                bgColor="brown"
                borderRadius="0"
                color="white"
                fontWeight="600"
                _hover={{ bg: 'gray.300' }}
                transition="all .2s ease"
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </Box>
        </Box>
      </Box>
      <Divider mb=".5rem" />
      <Flex justifyContent="space-between" p="0 .5rem .5rem .5rem">
        <Flex alignItems="center">
          <Text mr=".8rem" fontSize=".8rem" color="rgba(0, 0, 0, .5)">
            {getDateDiff(post.reg_dt)}
          </Text>
          {isAdmin && mode === 'main' && (
            <>
              <EditIcon mr=".3rem" color="brown" cursor="pointer" onClick={() => handlePostModify(post.title)} />
              <DeleteIcon color="brown" cursor="pointer" onClick={() => handlePostCancel(post.id)} />
            </>
          )}
        </Flex>
        <Flex justifyContent="center" alignItems="center">
          <ViewIcon w=".8rem" mr=".3rem" color="brown" />
          <Text fontSize=".8rem" color="rgba(0, 0, 0, .5)">
            {getCountFormat(post.click_count)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
});

export default PostCard;
