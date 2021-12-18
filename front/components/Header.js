import React from 'react';
import { useSelector } from 'react-redux';
import router from 'next/router';

import { Flex, Button } from '@chakra-ui/react';

const Header = () => {
  const { isAdmin } = useSelector((state) => state.user);

  const handleEditPost = () => {
    router.push('/editPost');
  };

  return (
    <header>
      <Flex
        w="100%"
        h="3rem"
        justifyContent="flex-end"
        alignItems="center"
        position="fixed"
        top="0"
        left="0"
        bg="white"
        boxShadow="sm"
        zIndex="9999"
      >
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
