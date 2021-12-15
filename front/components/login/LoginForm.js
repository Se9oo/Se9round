import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginRequestAction } from '../../reducers/user';

import { Box, Input, Button, useBreakpointValue } from '@chakra-ui/react';

const LoginForm = () => {
  const width = useBreakpointValue({
    xxs: '100%',
    xs: '100%',
    sm: '30rem',
    md: '30rem',
    lg: '30rem',
    xl: '30rem',
    xxl: '30rem',
    '2xl': '30rem',
  });

  const dispatch = useDispatch('');
  const { adminLoginSuccess } = useSelector((state) => state.user);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = () => {
    if (!id) {
      alert('아이디를 확인해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 확인해주세요.');
      return;
    }

    dispatch(adminLoginRequestAction({ id, password }));
  };

  useEffect(() => {
    if (adminLoginSuccess) {
      router.push('/');
    }
  }, [adminLoginSuccess]);

  return (
    <Box w={width} m="0 auto" bg="white" p="4rem 2rem" borderRadius="lg" boxShadow="sm">
      <form>
        <Input mb="1rem" placeholder="아이디" onChange={handleId} />
        <Input mb="1rem" type="password" placeholder="비밀번호" onChange={handlePassword} />
        <Button w="100%" onClick={handleSubmitForm}>
          관리자 로그인
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
