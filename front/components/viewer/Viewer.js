import React from 'react';

import { Box, useBreakpointValue } from '@chakra-ui/react';

import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const Viewer = ({ contents }) => {
  const width = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: '90%',
    xl: '85%',
    xxl: '85%',
    '2xl': '75%',
  });

  return (
    <Box w={width} bg="white" borderRadius="2rem" m="0 auto" p="1rem">
      <TuiViewer initialValue={contents} plugins={[[codeSyntaxHightlight, { hljs }]]} />
    </Box>
  );
};

export default Viewer;
