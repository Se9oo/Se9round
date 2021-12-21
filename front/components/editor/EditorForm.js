import React, { forwardRef, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import dynamic from 'next/dynamic';

import {
  Flex,
  Button,
  Input,
  Box,
  Text,
  useBreakpointValue,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import Alert from '../alert';

import { savePostRequestAction } from '../../reducers/post';

const PostEditor = dynamic(() => import('./Editor'), { ssr: false });

const ForwardedPostEditor = forwardRef((props, ref) => <PostEditor {...props} forwardRef={ref} />);

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

  // states
  const [title, setTitle] = useState('');
  const [tagsArray, setTagsArray] = useState([]);
  const [contents, setContents] = useState('');
  const dispatch = useDispatch('');

  // editor ref
  const editorRef = useRef(null);

  // alert
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  const handleDeleteTag = (tag) => () => {
    const newTagsArray = [...tagsArray].filter((orgTag) => orgTag !== tag);

    setTagsArray(newTagsArray);
  };

  // 제목 입력
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  // editor 글 작성
  const handleEditPost = () => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const html = instance.getHtml();

    setContents(html);
  };

  // 등록 버튼
  const handlePostSaveAlertOpen = () => {
    if (!title || tagsArray.length === 0 || !contents.trim()) {
      return;
    }

    // alert open
    onOpen();
  };

  // 게시글 저장
  const handlePostSave = () => {
    dispatch(
      savePostRequestAction({
        title,
        tagsArray,
        contents,
      })
    );

    // alert close
    onClose();
    // 게시글 저장 후 홈으로 이동
    router.push('/');
  };

  return (
    <>
      <Box w="100%" bg="white" p="1rem">
        <Text fontWeight="bold" mb=".5rem">
          제목
        </Text>
        <Input size="sm" mb="1rem" placeholder="제목을 입력하세요" onChange={handleTitle} />
        <Text fontWeight="bold" mb=".5rem">
          태그
        </Text>
        <Input size="sm" mb=".5rem" placeholder="태그를 입력하세요" onKeyPress={onKeyPress} />
        <Box mb=".5rem">
          {tagsArray.map((tag, idx) => (
            <Tag key={`${tag}_${idx}`} m=".1rem">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={handleDeleteTag(tag)} />
            </Tag>
          ))}
        </Box>
        <ForwardedPostEditor height="calc(100vh - 24rem)" editorRef={editorRef} handleEditPost={handleEditPost} />
        <Flex justifyContent="flex-end">
          <Button size={buttonSize} m="1rem .1rem">
            임시 저장
          </Button>
          <Button size={buttonSize} m="1rem .1rem" onClick={handlePostSaveAlertOpen}>
            등록
          </Button>
          <Button bg="gray.300" size={buttonSize} m="1rem 0">
            취소
          </Button>
        </Flex>
      </Box>
      <Alert
        title="게시글 저장"
        contents="게시글을 저장하시겠습니까?"
        mod="action"
        actionText="저장"
        btnAction={handlePostSave}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default EditorForm;
