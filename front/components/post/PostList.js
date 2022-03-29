import React, { useCallback, useEffect } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, useBreakpointValue } from '@chakra-ui/react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import PostCard from './PostCard';
import Alert from '../alert';
import useAlert from '../../hooks/useAlert';
import { addClickCountRequestAction, cancelPostRequestAction, deletePostRequestAction } from '../../reducers/post';

const PostList = ({ postList, manageMode = '' }) => {
  const gridTemplate = useBreakpointValue({
    xxs: 'repeat(1, 1fr)',
    xs: 'repeat(1, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(3, 1fr)',
  });

  const gridColumnGap = useBreakpointValue({
    xxs: '0',
    xs: '0',
    sm: '1rem',
    md: '1rem',
    lg: '1rem',
  });

  const dispatch = useDispatch('');
  const { cancelPostSuccess, cancelPostFailure, deletePostSuccess, deletePostFailure } = useSelector(
    (state) => state.post
  );
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
      title: `게시글 ${manageMode === 'delete' ? '영구 ' : ''}삭제`,
      contents: `게시글을 ${manageMode === 'delete' ? '영구 ' : ''}삭제 하시겠습니까?`,
      mod: 'action',
      actionText: '삭제',
      btnAction: () => postCancel(postId, manageMode),
    });
  }, []);

  const postCancel = (postId, manageMode) => {
    if (manageMode === 'delete') {
      // 게시글 영구 삭제 처리
      dispatch(deletePostRequestAction({ postId }));
    } else {
      // 게시글 상태 취소 처리
      dispatch(cancelPostRequestAction({ postId }));
    }

    // alert close
    onClose();
  };

  // 게시글 취소 성공
  useEffect(() => {
    if (cancelPostSuccess && manageMode !== 'delete') {
      openAlert({
        title: '게시글 삭제',
        contents: `게시글 삭제 성공`,
        mod: '',
      });
    }
  }, [cancelPostSuccess]);

  // 게시글 취소 실패
  useDeepCompareEffect(() => {
    if (cancelPostFailure.err && manageMode !== 'delete') {
      openAlert({
        title: '게시글 삭제',
        contents: `${cancelPostFailure.message}`,
        mod: '',
      });
    }
  }, [cancelPostFailure]);

  // 게시글 취소 성공
  useEffect(() => {
    if (deletePostSuccess && manageMode === 'delete') {
      openAlert({
        title: '게시글 영구 삭제',
        contents: `게시글 영구 삭제 성공`,
        mod: '',
      });
    }
  }, [deletePostSuccess]);

  // 게시글 취소 실패
  useDeepCompareEffect(() => {
    if (deletePostFailure.err && manageMode === 'delete') {
      openAlert({
        title: '게시글 영구 삭제',
        contents: `${deletePostFailure.message}`,
        mod: '',
      });
    }
  }, [deletePostFailure]);

  return (
    <>
      <Grid gridTemplateColumns={gridTemplate} gridColumnGap={gridColumnGap}>
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
