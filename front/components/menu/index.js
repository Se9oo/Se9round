import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import router from 'next/router';

import { adminLogoutRequestAction } from '../../reducers/user';

import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const HamburgerMenu = () => {
  const dispatch = useDispatch('');
  const { adminLogoutSuccess } = useSelector((state) => state.user);

  // 글쓰기 페이지로 이동
  const handleEditPost = () => {
    router.push('/editPost');
  };

  // 임시글 관리 페이지로 이동
  const handleTempPostManage = () => {
    router.push('/tempPostManage');
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
    <Menu>
      <MenuButton>
        <HamburgerIcon color="brown" fontSize="2rem" cursor="pointer" m="0 .5rem" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleEditPost}>글 쓰기</MenuItem>
        <MenuItem onClick={handleTempPostManage}>임시 글 관리</MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerMenu;
