import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { Box } from '@chakra-ui/react';

import Loading from '../spinner/Loading';
import TOC from '../toc';
import ScrollToTop from '../ScrollToTop';

const DynamicPostViewer = dynamic(() => import('./Viewer'), { loading: () => <Loading />, ssr: false });

const PostAndToc = ({ title, contents }) => {
  const [tocId, setTocId] = useState(null);

  return (
    <>
      <Box position="absolute" left="100%" ml="5rem">
        <TOC title={title} contents={contents} tocId={tocId} />
        <ScrollToTop />
      </Box>
      <DynamicPostViewer contents={contents} setTocId={setTocId} />
    </>
  );
};

export default PostAndToc;
