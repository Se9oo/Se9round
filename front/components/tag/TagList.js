import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadTagsRequestAction } from '../../reducers/tag';

import { Box, Flex } from '@chakra-ui/react';
import TagItem from './TagItem';

const TagList = () => {
  const dispatch = useDispatch('');
  const { tagList } = useSelector((state) => state.tag);

  useEffect(() => {
    dispatch(loadTagsRequestAction());
  }, []);

  return (
    <Flex flexWrap="wrap">
      {tagList.map((tag, idx) => {
        return <TagItem key={`${tag.name}_${idx}`} tag={tag} />;
      })}
    </Flex>
  );
};

export default TagList;
