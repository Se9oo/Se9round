import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

import { Flex, Image, useBreakpointValue } from '@chakra-ui/react';

import useScroll from '../hooks/useScroll';
import HamburgerMenu from './menu';

const Header = () => {
  const logoSize = useBreakpointValue({
    xxs: '1.3rem',
    xs: '1.3rem',
  });

  const { isAdmin, adminLogoutSuccess } = useSelector((state) => state.user);
  const { scrollY, isShowHeader } = useScroll();

  // 로고 클릭시 홈으로 이동
  const handleLogo = () => {
    router.push('/');
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
        zIndex="9999"
        mt={isShowHeader ? 0 : `${-1 * scrollY}px`}
        transition="all .2s ease"
      >
        <Image
          h={logoSize}
          src="/assets/images/se9round_logo.svg"
          alt="logo"
          p="0 .5rem"
          onClick={handleLogo}
          cursor="pointer"
        />
        {isAdmin && <HamburgerMenu />}
      </Flex>
    </header>
  );
};

export default Header;
