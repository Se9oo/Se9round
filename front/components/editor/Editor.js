import React from 'react';

import { Box } from '@chakra-ui/react';

import { Editor as TuiEditor } from '@toast-ui/react-editor';

const Editor = ({ height, editorRef, handleEditPost }) => {
  return (
    <>
      <Box w="100%" bg="white">
        <TuiEditor
          initialValue="게시글을 작성하세요!"
          previewStyle="vertical"
          height={height}
          initialEditType="wysiwyg"
          ref={editorRef}
          onChange={handleEditPost}
        />
      </Box>
    </>
  );
};

export default Editor;
