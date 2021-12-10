import React from 'react';

import { Flex } from '@chakra-ui/layout';

import MainLayout from '../components/MainLayout';
import LoginForm from '../components/login/LoginForm';

const Admin = () => {
  return (
    <MainLayout>
      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
        <LoginForm />
      </Flex>
    </MainLayout>
  );
};

export default Admin;
