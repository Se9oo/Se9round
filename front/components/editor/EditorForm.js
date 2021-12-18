import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { Flex, Button, Input, Box, Text, useBreakpointValue, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

const PostEditor = dynamic(() => import('./Editor'), { ssr: false });

const EditorForm = () => {
  const buttonSize = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'sm',
    md: 'sm',
    lg: 'md',
    xl: 'md',
    xxl: 'md',
    '2xl': 'md',
  });

  const [tagsArray, setTagsArray] = useState([]);

  // 태그 등록
  const onKeyPress = (e) => {
    if (e.key == 'Enter') {
      let tag = String(e.target.value).trim().toLowerCase();

      if (tag !== '' && tag !== undefined && !tagsArray.includes(tag)) {
        setTagsArray([...tagsArray, tag]);
        e.target.value = '';
      }
    }
  };

  // 태그 삭제
  const handleTagClose = (tag) => () => {
    const newTagsArray = [...tagsArray].filter((orgTag) => orgTag !== tag);

    setTagsArray(newTagsArray);
  };

  return (
    <Box w="100%" bg="white" p="1rem">
      <Text fontWeight="bold" mb=".5rem">
        제목
      </Text>
      <Input size="sm" mb="1rem" placeholder="제목을 입력하세요" />
      <Text fontWeight="bold" mb=".5rem">
        태그
      </Text>
      <Input size="sm" mb=".5rem" placeholder="태그를 입력하세요" onKeyPress={onKeyPress} />
      <Box mb=".5rem">
        {tagsArray.map((tag, idx) => (
          <Tag key={`${tag}_${idx}`} m=".1rem">
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={handleTagClose(tag)} />
          </Tag>
        ))}
      </Box>
      <PostEditor height="calc(100vh - 24rem)" />
      <Flex justifyContent="flex-end">
        <Button size={buttonSize} m="1rem .1rem">
          등록
        </Button>
        <Button bg="gray.300" size={buttonSize} m="1rem 0">
          취소
        </Button>
      </Flex>
    </Box>
  );
};

export default EditorForm;
