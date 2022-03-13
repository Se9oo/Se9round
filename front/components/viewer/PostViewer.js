import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Heading, Tag, TagLabel } from '@chakra-ui/react';

const DynamicPostViewer = dynamic(() => import('./Viewer'), { ssr: false });

const PostViewer = ({ title, contents, tags }) => {
  return (
    <Box w="100%" bg="white" borderRadius="1rem" m="0 auto 5rem auto" p="1rem">
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
              cursor="pointer"
              _hover={{ bg: 'rgba(226, 232, 240, .3)' }}
            >
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
      </Box>
      <DynamicPostViewer contents={contents} />
    </Box>
  );
};

export default PostViewer;
