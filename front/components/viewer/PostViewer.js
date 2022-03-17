import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Flex, Heading, Tag, TagLabel, Text } from '@chakra-ui/react';
import { getDateFormatToKor } from '../../util/common';
import Loading from '../spinner/Loading';

const DynamicPostViewer = dynamic(() => import('./Viewer'), { loading: () => <Loading />, ssr: false });

const PostViewer = ({ title, contents, tags, reg_dt }) => {
  return (
    <Box w="100%" bg="white" m="0 auto 5rem auto" p="3rem">
      <Flex w="100%" flexDir="column" justifyContent="center" alignItems="center">
        <Heading as="h1" fontSize="3rem" mb="2rem">
          {title}
        </Heading>
        <Box mb="2rem">
          {tags &&
            tags.map((tag, idx) => (
              <Tag
                key={`${tag}_${idx}`}
                fontSize="1.2rem"
                m=".1rem .5rem .1rem 0"
                bg="brown"
                color="white"
                cursor="pointer"
                _hover={{ bg: 'gray.200' }}
              >
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
        </Box>
        <Text color="gray.400" mb="2rem">
          {getDateFormatToKor(reg_dt)}
        </Text>
      </Flex>
      <DynamicPostViewer contents={contents} />
    </Box>
  );
};

export default PostViewer;
