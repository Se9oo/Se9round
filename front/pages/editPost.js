import React from 'react';

import MainLayout from '../components/MainLayout';
import EditorForm from '../components/editor/EditorForm';
import { useSelector } from 'react-redux';
import Error from './_error';

const editPost = () => {
  const { isAdmin } = useSelector((state) => state.user);
  return (
    <>
      {isAdmin ? (
        <MainLayout>
          <EditorForm />
        </MainLayout>
      ) : (
        <Error statusCode="401" />
      )}
    </>
  );
};

export default editPost;
