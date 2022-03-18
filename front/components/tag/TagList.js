import React, { useCallback } from 'react';
import router from 'next/router';

import { Flex } from '@chakra-ui/react';
import TagItem from './TagItem';

const TagList = ({ tagList }) => {
  const handleSearchTag = useCallback((search) => {
    router.push({
      pathname: '/search',
      query: { q: search },
    });
  }, []);

  return (
    <Flex flexWrap="wrap" mb="2rem">
      {tagList.map((tag, idx) => {
        return <TagItem key={`${tag.name}_${idx}`} tag={tag} handleSearchTag={handleSearchTag} />;
      })}
    </Flex>
  );
};

export default TagList;
