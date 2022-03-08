import React, { useEffect } from 'react';

import { Box } from '@chakra-ui/react';

import { Editor as TuiEditor } from '@toast-ui/react-editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const Editor = ({ height, editorRef, handleEditPost, initialValue }) => {
  useEffect(() => {
    if (initialValue !== '' && initialValue) {
      editorRef.current.getInstance().setMarkdown(initialValue);
    }
  }, [editorRef.current]);

  return (
    <>
      <Box w="100%" bg="white">
        <TuiEditor
          initialValue={initialValue === '' ? '게시글을 작성하세요!' : initialValue}
          previewStyle="vertical"
          height={height}
          initialEditType="wysiwyg"
          ref={editorRef}
          onChange={handleEditPost}
          plugins={[[codeSyntaxHightlight, { hljs }], [colorSyntax]]}
        />
      </Box>
    </>
  );
};

export default Editor;
