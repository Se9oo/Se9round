import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
});

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
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
    },
  },
  breakpoints,
  colors,
});

export default theme;
