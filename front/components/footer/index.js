import React from 'react';

import { Flex, Img, Text } from '@chakra-ui/react';

const Footer = () => {
  const handleGithubIcon = () => {
    window.open('https://github.com/Se9oo', '_blank');
  };
  return (
    <footer>
      <Flex w="100%" h="6rem" flexDir="column" justifyContent="center" alignItems="center" bgColor="white">
        <Text color="gray.400" fontWeight="700" mb=".5rem">
          Copyright &copy; 2022 se9oo All Rights Reserved.
        </Text>
        <Img src="/assets/images/github.svg" alt="github-logo" w="1.8rem" cursor="pointer" onClick={handleGithubIcon} />
      </Flex>
    </footer>
  );
};

export default Footer;
