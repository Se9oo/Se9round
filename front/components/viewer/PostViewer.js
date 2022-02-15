import React from 'react';
import dynamic from 'next/dynamic';
import { Box, Heading, Tag, TagLabel, useBreakpointValue } from '@chakra-ui/react';

const DynamicPostViewer = dynamic(() => import('./Viewer'), { ssr: false });

const PostViewer = ({ title, contents, tags }) => {
  const width = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: '80%',
    xl: '75%',
    xxl: '75%',
    '2xl': '65%',
  });

  return (
    <Box w={width} bg="white" borderRadius="2rem" m="0 auto" p="1rem">
      <Heading as="h1" fontSize="3rem" mb="2rem">
        {title}
      </Heading>
      <Box mb="2rem">
        {tags.map((tag, idx) => (
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
