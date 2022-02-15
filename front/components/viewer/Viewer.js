import React from 'react';

import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const Viewer = ({ contents }) => {
  return <TuiViewer initialValue={contents} plugins={[[codeSyntaxHightlight, { hljs }]]} />;
};

export default Viewer;
