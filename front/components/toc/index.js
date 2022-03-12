import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';

import { getMarkdownHeader } from '../../util/common';
import TocItem from './TocItem';

const TOC = ({ title, contents }) => {
  const [selectedTocItem, setSelectedTocItem] = useState(null);
  const markdownHeaders = getMarkdownHeader(title, contents);

  const handleTocItem = (e, href) => {
    e.preventDefault();

    setSelectedTocItem(href);
    document.location.href = href;
  };

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
        return (
          <TocItem
            key={`${header.text}_${idx}`}
            header={header}
            selectedTocItem={selectedTocItem}
            handleTocItem={handleTocItem}
          />
        );
      })}
    </Box>
  );
};

export default TOC;
