import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import PostList from '../post/PostList';

const PostManageTab = ({ tempPostList, cancelPostList }) => {
  return (
    <Tabs isFitted>
      <TabList m="1rem 0">
        <Tab bg="white" color="black" _selected={{ bg: 'brown', color: 'white' }}>
          임시 글
        </Tab>
        <Tab bg="white" color="black" _selected={{ bg: 'brown', color: 'white' }}>
          삭제된 글
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <PostList postList={tempPostList} />
        </TabPanel>
        <TabPanel>
          <PostList postList={cancelPostList} manageMode="delete" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default PostManageTab;
