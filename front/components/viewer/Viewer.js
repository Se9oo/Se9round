import React, { useEffect } from 'react';

import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const Viewer = ({ contents }) => {
  // header tag에 id 설정
  useEffect(() => {
    const tags = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headers = Array.prototype.slice.call(tags);

    headers.map((tag) => {
      let text = tag.innerHTML;
      text = text.replace(/ /g, '-');
      tag.id = text;
    });
  }, []);

  return <TuiViewer initialValue={contents} plugins={[[codeSyntaxHightlight, { hljs }]]} />;
};

export default Viewer;
