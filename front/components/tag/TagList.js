import React from 'react';

import { Flex } from '@chakra-ui/react';
import TagItem from './TagItem';

const TagList = ({ tagList }) => {
  return (
    <Flex flexWrap="wrap" mb="3rem">
      {tagList.map((tag, idx) => {
        return <TagItem key={`${tag.name}_${idx}`} tag={tag} />;
      })}
    </Flex>
  );
};

export default TagList;
