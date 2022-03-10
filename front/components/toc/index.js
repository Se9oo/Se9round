import React from 'react';

import { Box } from '@chakra-ui/react';

import { getMarkdownHeader } from '../../util/common';
import TocItem from './TocItem';

const TOC = ({ title, contents }) => {
  const markdownHeaders = getMarkdownHeader(title, contents);

  return (
    <Box
      position="fixed"
      top="100px"
      right="50px"
      borderLeftWidth="3px"
      borderLeftStyle="solid"
      borderLeftColor="brown"
      p="1rem"
    >
      {markdownHeaders.map((header, idx) => {
        return <TocItem key={`${header.text}_${idx}`} header={header} />;
      })}
    </Box>
  );
};

export default TOC;
