import React, { useEffect, useRef, useState } from 'react';
import router from 'next/router';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBox = ({ query }) => {
  // focus 설정
  const searchRef = useRef('');

  useEffect(() => {
    searchRef.current.focus();

    if (query) {
      setSearch(query);
    }
  }, []);

  // search input state
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // 검색어 search event
  const handleSearchWord = (e) => {
    if (e.key === 'Enter') {
      router.push({
        pathname: '/search',
        query: { q: search },
      });
    }
  };

  return (
    <InputGroup size="lg" mb="1.5rem">
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="brown" />} />
      <Input
        type="text"
        placeholder="검색어를 입력하거나 태그를 선택 해주세요!"
        bg="white"
        ref={searchRef}
        onChange={handleSearch}
        onKeyPress={handleSearchWord}
        value={search}
      />
    </InputGroup>
  );
};

export default SearchBox;
