import React, { useCallback, useEffect } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, useBreakpointValue } from '@chakra-ui/react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import PostCard from './PostCard';
import Alert from '../alert';
import useAlert from '../../hooks/useAlert';
import { addClickCountRequestAction, cancelPostRequestAction } from '../../reducers/post';

const PostList = ({ postList }) => {
  const gridTemplate = useBreakpointValue({
    xxs: 'repeat(1, 1fr)',
    xs: 'repeat(1, 1fr)',
    sm: 'repeat(1, 1fr)',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  });

  const dispatch = useDispatch('');
  const { cancelPostSuccess, cancelPostFailure } = useSelector((state) => state.post);
  const { isOpen, openAlert, alertProps, onClose } = useAlert();

  // 게시글 상세 페이지로 이동
  const handlePostClick = useCallback((postId, postTitle) => {
    // 조회수 add
    dispatch(addClickCountRequestAction({ postId }));

    router.push({
      pathname: `/post/[postTitle]`,
      query: { postTitle },
    });
  }, []);

  // 게시글 수정 페이지로 이동
  const handlePostModify = useCallback((postTitle) => {
    router.push({
      pathname: `/post/[postTitle]/modify`,
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
      <Grid gridTemplateColumns={gridTemplate}>
        {postList.map((post) => {
          return (
            <PostCard
              key={post.id}
              post={post}
              handlePostClick={handlePostClick}
              handlePostCancel={handlePostCancel}
              handlePostModify={handlePostModify}
              mode="main"
            />
          );
        })}
      </Grid>

      <Alert alertProps={alertProps} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PostList;
