import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { baseURL } from '../../config/config';

import Alert from '../alert';
import useAlert from '../../hooks/useAlert';
import { getImgUrlByRegExp } from '../../util/common';

import { Flex, Button, Input, Box, Text, useBreakpointValue, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

import { modifyPostRequestAction, savePostRequestAction, tempSavePostRequestAction } from '../../reducers/post';

const PostEditor = dynamic(() => import('./Editor'), { ssr: false });

const ForwardedPostEditor = forwardRef((props, ref) => <PostEditor {...props} forwardRef={ref} />);

const EditorForm = ({ mode = 'edit', loadPostInfo = {} }) => {
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
  const [subTitle, setSubTitle] = useState('');
  const [tagsArray, setTagsArray] = useState([]);
  const [contents, setContents] = useState('');
  const [contentsHtml, setContentsHtml] = useState('');

  const { isOpen, openAlert, alertProps, onClose } = useAlert();

  const dispatch = useDispatch('');
  const {
    savePostSuccess,
    savePostFailure,
    tempSavePostSuccess,
    tempSavePostFailure,
    modifyPostSuccess,
    modifyPostFailure,
  } = useSelector((state) => state.post);

  // editor ref
  const editorRef = useRef(null);

  useEffect(() => {
    if (Object.keys(loadPostInfo).length > 0) {
      const { title, sub_title, tags, contents } = loadPostInfo;
      setTitle(title);
      setSubTitle(sub_title);
      setTagsArray(tags);
      setContents(contents);
    }
  }, []);

  // image editor에 추가시 서버에 image 저장
  useEffect(() => {
    if (editorRef.current) {
      // 기존 library hook 제거
      editorRef.current.getInstance().removeHook('addImageBlobHook');
      // 새로운 hook 추가
      editorRef.current.getInstance().addHook('addImageBlobHook', (blob, callback) => {
        (async () => {
          let formData = new FormData();
          formData.append('image', blob);

          //dispatch(saveImageRequestAction(formData));
          const { data } = await axios.post('/api/image', formData);

          callback(`${baseURL}/${data}`, 'alt image');
        })();

        return false;
      });
    }

    return () => {};
  }, [editorRef.current]);

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

  // 소제목 입력
  const handleSubTitle = (e) => {
    setSubTitle(e.target.value);
  };

  // editor 글 작성
  const handleEditPost = () => {
    if (!editorRef.current) {
      return;
    }

    const instance = editorRef.current.getInstance();
    const html = instance.getHtml();
    const markDown = instance.getMarkdown();

    setContentsHtml(html);
    setContents(markDown);
  };

  // 등록/임시저장 버튼
  const handlePostSaveAlertOpen = (type) => {
    let alertTitle = type === 'save' ? '게시글 저장' : type === 'temp' ? '게시글 임시 저장' : '게시글 수정';
    let alertContents = '';

    if (!title) {
      alertContents = `'제목'을 입력 해주세요.`;
    } else if (!subTitle && type === 'save') {
      alertContents = `'한 줄 소개'를 입력 해주세요.`;
    } else if (tagsArray.length === 0 && type === 'save') {
      alertContents = `'태그'를 추가 해주세요.`;
    } else if (!contents.trim() && type === 'save') {
      alertContents = `'게시글'을 작성 해주세요.`;
    }

    if (
      ((type === 'save' || type === 'modify') && (!title || !subTitle || tagsArray.length === 0 || !contents.trim())) ||
      (type === 'temp' && !title)
    ) {
      // modal 세팅
      openAlert({
        title: alertTitle,
        contents: alertContents,
        mod: '',
      });

      return;
    }

    alertContents =
      type === 'save'
        ? '게시글을 저장 하시겠습니까?'
        : type === 'temp'
        ? '게시글을 임시 저장 하시겠습니까?'
        : '게시글을 수정 하시겠습니까?';

    // modal 세팅
    openAlert({
      title: alertTitle,
      contents: alertContents,
      mod: 'action',
      btnAction: () => handlePostSave(type),
      actionText: type === 'modify' ? '수정' : '저장',
    });
  };

  // 게시글 저장 or 임시 저장 or 수정
  const handlePostSave = (type) => {
    const editorValues = { title, tagsArray, contents, subTitle };
    // thumbnail 세팅
    editorValues.thumbNail = getImgUrlByRegExp(contentsHtml);

    if (type !== '') {
      dispatch(
        type === 'save'
          ? savePostRequestAction(editorValues)
          : type === 'temp'
          ? tempSavePostRequestAction(editorValues)
          : modifyPostRequestAction(editorValues)
      );
    }

    // alert close
    onClose();
  };

  // 게시글 저장 후 저장이 성공하면 홈으로 이동
  useEffect(() => {
    if (savePostSuccess) {
      router.push('/');
    }
  }, [savePostSuccess]);

  useEffect(() => {
    if (tempSavePostSuccess) {
      openAlert({
        title: '게시글 임시 저장',
        contents: '게시글 임시 저장 성공',
        mod: '',
      });
    }
  }, [tempSavePostSuccess]);

  useEffect(() => {
    if (modifyPostSuccess) {
      router.push('/');
    }
  }, [modifyPostSuccess]);

  useDeepCompareEffect(() => {
    if (savePostFailure.err) {
      openAlert({
        title: '게시글 저장',
        contents: `${savePostFailure.message}`,
        mod: '',
      });
    }
  }, [savePostFailure]);

  useDeepCompareEffect(() => {
    if (tempSavePostFailure.err) {
      openAlert({
        title: '게시글 임시 저장',
        contents: `${tempSavePostFailure.message}`,
        mod: '',
      });
    }
  }, [tempSavePostFailure]);

  useDeepCompareEffect(() => {
    if (modifyPostFailure.err) {
      openAlert({
        title: '게시글 수정',
        contents: `${modifyPostFailure.message}`,
        mod: '',
      });
    }
  }, [modifyPostFailure]);

  return (
    <>
      <Box w="100%" bg="white" p="1rem">
        <Text fontWeight="bold" mb=".5rem">
          제목
        </Text>
        <Input
          size="sm"
          mb="1rem"
          placeholder="제목을 입력하세요"
          onChange={handleTitle}
          value={title}
          readOnly={mode === 'modify'}
        />
        <Text fontWeight="bold" mb=".5rem">
          한 줄 소개
        </Text>
        <Input size="sm" mb="1rem" placeholder="한 줄 소개" onChange={handleSubTitle} value={subTitle} />
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
        <ForwardedPostEditor
          height="calc(100vh - 30rem)"
          editorRef={editorRef}
          handleEditPost={handleEditPost}
          initialValue={contents}
        />
        <Flex justifyContent="flex-end">
          {mode === 'edit' ? (
            <>
              <Button size={buttonSize} m="1rem .1rem" onClick={() => handlePostSaveAlertOpen('temp')}>
                임시 저장
              </Button>
              <Button size={buttonSize} m="1rem .1rem" onClick={() => handlePostSaveAlertOpen('save')}>
                등록
              </Button>
            </>
          ) : (
            <Button size={buttonSize} m="1rem .1rem" onClick={() => handlePostSaveAlertOpen('modify')}>
              수정
            </Button>
          )}

          <Button bg="gray.300" size={buttonSize} m="1rem 0">
            취소
          </Button>
        </Flex>
      </Box>
      <Alert alertProps={alertProps} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default EditorForm;
