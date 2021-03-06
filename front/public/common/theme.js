import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { Button, Input } from './customComponents';

const breakpoints = createBreakpoints({
  xxs: '280px',
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  '2xl': '1400px',
});

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  brown: '#8C7A70',
};

const theme = extendTheme({
  fonts: {
    body: 'Apple SD Gothic',
  },
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        fontSize: ['16px', '16px', '16px', '18px', '18px', '18px', '18px'],
        scrollBehavior: 'smooth',
      },
      body: {
        backgroundColor: '#F5F5F5',
        position: 'relative',
      },
      'body, input, a, ol, ul, li, button': {
        fontFamily: `'Apple SD Gothic','Noto Sans KR','맑은고딕','Nanum Gothic','sans-serif'`,
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      'ol, ul, li': {
        listStyle: 'none',
      },
      img: {
        display: 'block',
      },
      'input, button': {
        backgroundColor: 'transparent',
      },
      '.tui-editor-contents': {
        fontFamily: `'Apple SD Gothic', 'Apple SD 산돌고딕 Neo', -apple-system, 'Lucida Grande',
          '맑은 고딕', 'Malgun Gothic', 'Segoe UI', '돋움', dotum, sans-serif`,
        fontSize: '1rem',
        border: 0,
        borderRadius: 0,
      },
      // code block - one dark style
      '.tui-editor-contents pre': {
        color: '#abb2bf',
        backgroundColor: '#282c34',
      },
      // markdown code style
      '.tui-editor-contents pre code': {
        fontFamily: `'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace',
          'Apple SD Gothic', 'Apple SD 산돌고딕 Neo', -apple-system, 'Lucida Grande',
          '맑은 고딕', 'Malgun Gothic', 'Segoe UI', '돋움', dotum, sans-serif`,
        border: 0,
        borderRadius: 0,
        color: '#abb2bf',
      },
      '.tui-editor-contents h2': {
        fontSize: '1.5rem',
      },
      // markdown header style
      '.tui-editor-contents h1, .tui-editor-contents h2': {
        borderBottom: 'none',
        lineHeight: '1.2',
      },
      '.tui-editor-contents h3': {
        margin: '18px 0 8px',
      },
      // markdown a tag style
      '.tui-editor-contents a': {
        textDecoration: 'none',
      },
      '.tui-editor-contents a:hover': {
        textDecoration: 'underline',
      },
      '.tui-editor-contents img': {
        margin: '.5rem auto',
      },
      '.tui-editor-contents ol': {
        margin: '10px 0 10px',
      },
      '.tui-editor-contents blockquote': {
        borderLeft: '4px solid #8C7A70',
      },
      '.te-md-container .CodeMirror': {
        fontFamily: `'Apple SD Gothic', 'Apple SD 산돌고딕 Neo', -apple-system, 'Lucida Grande',
          '맑은 고딕', 'Malgun Gothic', 'Segoe UI', '돋움', dotum, sans-serif`,
        fontSize: '1rem',
        border: 0,
        borderRadius: 0,
      },
      code: {
        fontSize: '.9rem',
      },
    },
  },
  components: {
    Button,
    Input,
  },
  breakpoints,
  colors,
});

export default theme;
