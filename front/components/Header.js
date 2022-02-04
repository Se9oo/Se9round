import React from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

import { Flex, Button, Image } from '@chakra-ui/react';

const Header = () => {
  const { isAdmin } = useSelector((state) => state.user);

  // 로고 클릭시 홈으로 이동
  const handleLogo = () => {
    router.push('/');
  };

  // 글쓰기 페이지로 이동
  const handleEditPost = () => {
    router.push('/editPost');
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
        boxShadow="sm"
        zIndex="9999"
      >
        <Image src="/assets/images/se9round_logo.svg" alt="logo" p="1rem" onClick={handleLogo} cursor="pointer" />
        {isAdmin && (
          <Button size="sm" m="0 1rem" onClick={handleEditPost}>
            글쓰기
          </Button>
        )}
      </Flex>
    </header>
  );
};

export default Header;
