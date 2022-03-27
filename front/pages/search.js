import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import MainLayout from '../components/MainLayout';
import SearchBox from '../components/search';
import TagList from '../components/tag/TagList';
import PostList from '../components/post/PostList';

import { Heading } from '@chakra-ui/react';

import { checkIsAdminRequestAction } from '../reducers/user';
import { searchPostsRequestAction } from '../reducers/post';
import { loadTagsRequestAction } from '../reducers/tag';

import wrapper from '../store/configureStore';
import axios from 'axios';

const Search = ({ query }) => {
  const { tagList } = useSelector((state) => state.tag);
  const { searchPostList } = useSelector((state) => state.post);

  return (
    <MainLayout>
      <SearchBox query={query} />
      <TagList tagList={tagList} mode="search" />
      {query !== null && (
        <Heading
          as="h3"
          fontSize="1.5rem"
          borderLeftColor="brown"
          borderLeftWidth="3px"
          borderLeftStyle="solid"
          mb="1rem"
          p="0 .5rem"
        >
          {`"${query}" 검색 결과`}
        </Heading>
      )}
      <PostList postList={searchPostList} />
    </MainLayout>
  );
};

export default Search;

// SSR
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, res, ...etc }) => {
  const { q } = etc.query;

  // header에 cookie 넣어주기
  const cookies = req ? req.headers.cookie : '';

  axios.defaults.headers.Cookie = '';

  if (req && cookies) {
    axios.defaults.headers.Cookie = cookies;
  }

  // 권한 체크
  store.dispatch(checkIsAdminRequestAction());
  // 태그 목록 조회
  store.dispatch(loadTagsRequestAction());

  // query string 존재시 게시글 검색
  if (q) {
    store.dispatch(searchPostsRequestAction(q));
  }

  store.dispatch(END);

  await store.sagaTask.toPromise();

  return {
    props: { query: q ? q : null },
  };
});
