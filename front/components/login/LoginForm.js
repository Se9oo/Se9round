import React, { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginRequestAction } from '../../reducers/user';

import { Input, Button, useBreakpointValue, Image, Flex } from '@chakra-ui/react';
import Alert from '../alert';
import useAlert from '../../hooks/useAlert';

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

  const [key, setKey] = useState('');

  const dispatch = useDispatch('');
  const { adminLoginSuccess, adminLoginFailure, isAdmin } = useSelector((state) => state.user);

  const { isOpen, openAlert, alertProps, onClose } = useAlert();

  useEffect(() => {
    if (isAdmin) {
      openAlert({
        title: '알림',
        contents: '이미 로그인 중 입니다.',
        mod: '',
      });
    }
  }, []);

  const handleKey = (e) => {
    setKey(e.target.value);
  };

  const handleSubmitForm = () => {
    if (!key) {
      openAlert({
        title: '관리자 로그인',
        contents: `KEY 값을 확인해주세요.`,
        mod: '',
      });

      return;
    }

    dispatch(adminLoginRequestAction({ key }));
  };

  // 로그인 성공
  useEffect(() => {
    if (adminLoginSuccess) {
      router.push('/');
    }
  }, [adminLoginSuccess]);

  // 로그인 실패
  useDeepCompareEffect(() => {
    if (adminLoginFailure.err) {
      openAlert({
        title: '관리자 로그인',
        contents: `${adminLoginFailure.msg}`,
        mod: '',
      });
    }
  }, [adminLoginFailure]);

  return (
    <>
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        w={width}
        m="0 auto"
        bg="white"
        p="4rem 2rem"
        borderRadius="lg"
        boxShadow="sm"
      >
        <Image src="/assets/images/se9round_logo.svg" alt="se9round-logo" mb="2rem" />
        <form>
          <Input mb="1rem" placeholder="KEY 를 입력하세요" onChange={handleKey} />
          <Button w="100%" onClick={handleSubmitForm}>
            관리자 로그인
          </Button>
        </form>
      </Flex>
      <Alert alertProps={alertProps} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default LoginForm;
