import React, { useEffect, useState } from 'react';

import { Box } from '@chakra-ui/react';

import { getMarkdownHeader } from '../../util/common';
import TocItem from './TocItem';

const TOC = ({ title, contents, tocId }) => {
  const [selectedTocItem, setSelectedTocItem] = useState(null);
  const markdownHeaders = getMarkdownHeader(title, contents);

  const handleTocItem = (e, href) => {
    e.preventDefault();

    setSelectedTocItem(href);
    document.location.href = href;
  };

  useEffect(() => {
    if (tocId) {
      setSelectedTocItem(`#${tocId}`);
    }
  }, [tocId]);

  return (
    <Box w="250px" position="fixed" borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="brown" p="1rem">
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
