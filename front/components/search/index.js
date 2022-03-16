import React, { useEffect, useRef, useState } from 'react';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBox = () => {
  // focus 설정
  const searchRef = useRef('');

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  // search input state
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
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
        value={search}
      />
    </InputGroup>
  );
};

export default SearchBox;
