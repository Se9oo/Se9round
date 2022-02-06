import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { Button, Input } from './customComponents';

const breakpoints = createBreakpoints({
  xxs: '17.5rem',
  xs: '20rem',
  sm: '36rem',
  md: '48rem',
  lg: '62rem',
  xl: '75rem',
  xxl: '87.5rem',
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
        fontSize: '16px',
      },
      body: {
        backgroundColor: 'gray.200',
        fontSize: '16px',
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
        fontFamily: `'Apple SD Gothic','Noto Sans KR','맑은고딕','Nanum Gothic','sans-serif'`,
        fontSize: '16px',
      },
      '.te-md-container .CodeMirror': {
        fontFamily: `'Apple SD Gothic','Noto Sans KR','맑은고딕','Nanum Gothic','sans-serif'`,
        fontSize: '16px',
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
