import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, useBreakpointValue } from '@chakra-ui/react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import PostCard from './PostCard';
import Alert from '../alert';
import useAlert from '../../hooks/useAlert';
import { cancelPostRequestAction } from '../../reducers/post';

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

  // 게시글 제어 아이콘 버튼 클릭
  const handlePostActionButton = useCallback((action, postId) => {
    let alertTitle;
    let alertContents;
    let actionText;
    let btnAction;

    if (action === 'cancel') {
      alertTitle = '게시글 삭제';
      alertContents = '게시글을 삭제 하시겠습니까?';
      actionText = '삭제';
      btnAction = handlePostCancel;
    }

    openAlert({
      title: alertTitle,
      contents: alertContents,
      mod: 'action',
      actionText: actionText,
      btnAction: () => btnAction(postId),
    });
  }, []);

  // 게시글 취소
  const handlePostCancel = (postId) => {
    dispatch(cancelPostRequestAction({ postId: postId }));

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
            return <PostCard key={post.id} post={post} handlePostActionButton={handlePostActionButton} />;
          })}
        </Flex>
      </Flex>
      <Alert alertProps={alertProps} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default PostList;
