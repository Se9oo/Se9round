import React, { useEffect, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginRequestAction } from '../../reducers/user';

import { Input, Button, useBreakpointValue, Image, Flex, useDisclosure } from '@chakra-ui/react';
import Alert from '../alert';

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
  // alert state
  const [alertProps, setAlertProps] = useState({});

  const dispatch = useDispatch('');
  const { adminLoginSuccess, adminLoginFailure } = useSelector((state) => state.user);

  // alert
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleKey = (e) => {
    setKey(e.target.value);
  };

  const handleSubmitForm = () => {
    if (!key) {
      alert('key 값을 확인해주세요.');
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
      setAlertProps({
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
      <Alert
        title={alertProps.title}
        contents={alertProps.contents}
        mod={alertProps.mod}
        actionText={alertProps.actionText}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default LoginForm;
