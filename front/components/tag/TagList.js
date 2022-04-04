import React, { useCallback } from 'react';
import router from 'next/router';

import { Flex } from '@chakra-ui/react';
import TagItem from './TagItem';

const TagList = ({ tagList, mode }) => {
  const handleSearchTag = useCallback((search) => {
    router.push({
      pathname: '/search',
      query: { q: search },
    });
  }, []);

  return (
    <Flex flexWrap="wrap">
      {tagList.map((tag, idx) => {
        return <TagItem key={`${tag}_${idx}`} tag={tag} handleSearchTag={handleSearchTag} mode={mode} />;
      })}
    </Flex>
  );
};

export default TagList;
