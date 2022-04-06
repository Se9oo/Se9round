import React from 'react';
import router from 'next/router';

import { Button, Flex, Image, Text } from '@chakra-ui/react';

import MainLayout from '../components/MainLayout';

const Custom500 = () => {
  // 홈으로 이동
  const handleHome = () => {
    router.push('/home');
  };

  return (
    <MainLayout>
      <Flex w="100%" h="calc(100vh - 3rem - 6rem - 3rem)" flexDir="column" justifyContent="center" alignItems="center">
        <Image w="10rem" src="/assets/images/error.png" alt="404 error image" mb="1rem" />
        <Text mb="1rem">오류</Text>
        <Button size="sm" onClick={handleHome}>
          홈 바로가기
        </Button>
      </Flex>
    </MainLayout>
  );
};

export default Custom500;
