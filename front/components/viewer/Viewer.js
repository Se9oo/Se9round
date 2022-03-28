import React, { useEffect, useRef } from 'react';

import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import { getIntersectionObserver } from '../../util/observer';

const Viewer = ({ contents, setTocId }) => {
  const viewerRef = useRef();
  const observer = getIntersectionObserver(setTocId);

  // contents가 바뀐경우 viewer에 세팅
  useEffect(() => {
    viewerRef.current.getInstance().setMarkdown(contents);

    // contents에서 header tags 찾기
    const tags = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headers = Array.prototype.slice.call(tags);
    // 각 header tag에 id 부여
    headers.map((tag) => {
      let text = tag.innerHTML;
      text = text.replace(/ /g, '-');
      tag.id = text;
    });

    const headersElement = [...headers];

    // header에  observer 달기
    headersElement.map((header) => {
      observer.observe(header);
    });
  }, [contents]);

  return <TuiViewer initialValue={contents} ref={viewerRef} plugins={[[codeSyntaxHightlight, { hljs }]]} />;
};

export default Viewer;
