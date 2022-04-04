import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { Box, useBreakpointValue } from '@chakra-ui/react';

import Loading from '../spinner/Loading';
import TOC from '../toc';
import ScrollToTop from '../ScrollToTop';

const DynamicPostViewer = dynamic(() => import('./Viewer'), { loading: () => <Loading />, ssr: false });

const PostAndToc = ({ title, contents }) => {
  const display = useBreakpointValue({
    xxs: 'none',
    xs: 'none',
    sm: 'none',
    md: 'none',
    lg: 'none',
    xl: 'none',
    '2xl': 'block',
  });

  const [tocId, setTocId] = useState(null);

  return (
    <>
      <Box position="absolute" left="100%" ml="5rem">
        <TOC display={display} title={title} contents={contents} tocId={tocId} />
        <ScrollToTop display={display} />
      </Box>
      <DynamicPostViewer contents={contents} setTocId={setTocId} />
    </>
  );
};

export default PostAndToc;
