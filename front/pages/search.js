import React from 'react';
import MainLayout from '../components/MainLayout';
import SearchBox from '../components/search';
import TagList from '../components/tag/TagList';

const Search = () => {
  return (
    <MainLayout>
      <SearchBox />
      <TagList />
    </MainLayout>
  );
};

export default Search;
