import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { Flex, Box, Heading, Text, Image, Divider } from '@chakra-ui/react';
import { ViewIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { getCountFormat, getDateDiff } from '../../util/common';
import TagList from '../tag/TagList';

const PostCard = memo(({ post, handlePostClick, handlePostCancel, handlePostModify, mode }) => {
  const { isAdmin } = useSelector((state) => state.user);

  return (
    <Flex
      flexDir="column"
      bg="white"
      m=".5rem 0"
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
      <Flex flexDir="column" mb=".5rem" p="1rem" flex="1 1 0%">
        <Heading
          as="h2"
          fontSize="1.2rem"
          mb="2rem"
          cursor="pointer"
          onClick={() => handlePostClick(post.id, post.title)}
          wordBreak="break-all"
          flexBasis="40%"
          lineHeight="1.4"
        >
          {post.title}
        </Heading>
        <Text
          fontSize=".8rem"
          w="100%"
          textOverflow="ellipsis"
          overflow="hidden"
          wordBreak="break-word"
          noOfLines="2"
          cursor="pointer"
          onClick={() => handlePostClick(post.id, post.title)}
          flexBasis="40%"
        >
          {post.sub_title}
        </Text>
        <Box position="relative" mb=".5rem" pt="1.5rem" flexBasis="20%">
          <Box>
            <TagList tagList={post.tags} />
          </Box>
        </Box>
      </Flex>
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
