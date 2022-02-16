import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';

import { Flex, Box, Button, Image, useBreakpointValue } from '@chakra-ui/react';

import { adminLogoutRequestAction } from '../reducers/user';

const Header = () => {
  const { isAdmin, adminLogoutSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch('');

  const logoSize = useBreakpointValue({
    xxs: '1.3rem',
    xs: '1.3rem',
  });

  // 로고 클릭시 홈으로 이동
  const handleLogo = () => {
    router.push('/');
  };

  // 글쓰기 페이지로 이동
  const handleEditPost = () => {
    router.push('/editPost');
  };

  // 로그아웃
  const handleLogout = () => {
    dispatch(adminLogoutRequestAction());
  };

  useEffect(() => {
    if (adminLogoutSuccess) {
      router.push('/');
    }
  }, [adminLogoutSuccess]);

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
        boxShadow="sm"
        zIndex="9999"
      >
        <Image
          h={logoSize}
          src="/assets/images/se9round_logo.svg"
          alt="logo"
          p="0 .5rem"
          onClick={handleLogo}
          cursor="pointer"
        />
        {isAdmin && (
          <Box>
            <Button size="sm" m="0 .3rem 0 0" onClick={handleEditPost}>
              글쓰기
            </Button>
            <Button size="sm" m="0 .3rem 0 0" bg="gray.400" onClick={handleLogout}>
              로그아웃
            </Button>
          </Box>
        )}
      </Flex>
    </header>
  );
};

export default Header;
