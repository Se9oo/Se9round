import React, { useCallback, useEffect } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, useBreakpointValue } from '@chakra-ui/react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import PostCard from './PostCard';
import Alert from '../alert';
import useAlert from '../../hooks/useAlert';
import { addClickCountRequestAction, cancelPostRequestAction } from '../../reducers/post';

const PostList = () => {
  const width = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '100%',
    md: '100%',
    lg: '90%',
    xl: '85%',
    xxl: '85%',
    '2xl': '75%',
  });

  const dispatch = useDispatch('');
  const { postList, cancelPostSuccess, cancelPostFailure } = useSelector((state) => state.post);
  const { isOpen, openAlert, alertProps, onClose } = useAlert();

  // 게시글 페이지로 이동
  const handlePostClick = useCallback((postId, postTitle) => {
    // 조회수 add
    dispatch(addClickCountRequestAction({ postId }));

    router.push({
      pathname: `/post/[postTitle]`,
      query: { postTitle },
    });
  }, []);

  // 게시글 취소
  const handlePostCancel = useCallback((postId) => {
    openAlert({
      title: '게시글 삭제',
      contents: '게시글을 삭제 하시겠습니까?',
      mod: 'action',
      actionText: '삭제',
      btnAction: () => postCancel(postId),
    });
  }, []);

  const postCancel = (postId) => {
    dispatch(cancelPostRequestAction({ postId }));

    // alert close
    onClose();
  };

  // 게시글 취소 성공
  useEffect(() => {
    if (cancelPostSuccess) {
      openAlert({
        title: '게시글 삭제',
        contents: `게시글 삭제 성공`,
        mod: '',
      });
    }
  }, [cancelPostSuccess]);

  // 게시글 취소 실패
  useDeepCompareEffect(() => {
    if (cancelPostFailure.err) {
      openAlert({
        title: '게시글 삭제',
        contents: `${cancelPostFailure.message}`,
        mod: '',
      });
    }
  }, [cancelPostFailure]);

  return (
    <>
      <Flex flexDir="column" w={width}>
        <Flex flexWrap="wrap">
          {postList.map((post) => {
            return (
              <PostCard
                key={post.id}
                post={post}
                handlePostClick={handlePostClick}
                handlePostCancel={handlePostCancel}
              />
            );
          })}
        </Flex>
      </Flex>
      <Alert alertProps={alertProps} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PostList;
