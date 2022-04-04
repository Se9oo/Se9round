import React from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

import { Flex, Box, Image } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import HamburgerMenu from './menu';

const Header = () => {
  const { isAdmin } = useSelector((state) => state.user);

  // 로고 클릭시 홈으로 이동
  const handleLogo = () => {
    router.push('/');
  };

  // 검색 페이지로 이동
  const handleSearch = () => {
    router.push('/search');
  };

  return (
    <header>
      <Flex
        w="100%"
        h="3rem"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        top="0"
        left="0"
        bg="white"
        zIndex="9999"
        transition="all .2s ease"
        boxShadow="sm"
      >
        <Image src="/assets/images/se9round_logo.svg" alt="logo" p="0 .5rem" onClick={handleLogo} cursor="pointer" />
        <Box>
          <SearchIcon
            color="brown"
            fontSize="1.8rem"
            cursor="pointer"
            m="0 .5rem"
            _active={{ color: 'gray.200' }}
            transition="all .2s ease"
            onClick={handleSearch}
          />
          {isAdmin && <HamburgerMenu />}
        </Box>
      </Flex>
    </header>
  );
};

export default Header;
