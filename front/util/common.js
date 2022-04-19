import dayjs from 'dayjs';

// markdown에서 첫번째 이미지 URL 추출 함수
export const getImgUrlByRegExp = (text) => {
  // 이미지 URL 추출 정규식
  const regExp = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i;

  // 정규표현식에 해당하는 첫번째 이미지 추출
  const result = regExp.exec(text);

  if (result !== null && Array.isArray(result)) {
    return result[1];
  } else {
    return null;
  }
};

// date diff
export const getDateDiff = (regDt) => {
  const regDate = dayjs(regDt);
  const now = dayjs();

  if (now.diff(regDate, 'month') > 0 || now.diff(regDate, 'day') > 6) {
    return getDateFormatToKor(regDt);
  } else if (now.diff(regDate, 'day') > 0) {
    return `${now.diff(regDate, 'day')}일 전`;
  } else if (now.diff(regDate, 'h') > 0) {
    return `${now.diff(regDate, 'h')}시간 전`;
  } else if (now.diff(regDate, 'm') > 0) {
    return `${now.diff(regDate, 'm')}분 전`;
  } else if (now.diff(regDate, 's') >= 0) {
    return `${now.diff(regDate, 's')}초 전`;
  } else {
    return getDateFormatToKor(regDt);
  }
};

// date format (dt -> kor)
export const getDateFormatToKor = (regDt) => {
  if (!regDt || regDt.length !== 16) {
    return regDt;
  } else {
    return `${regDt.substr(0, 4)}년 ${regDt.substr(5, 2)}월 ${regDt.substr(8, 2)}일`;
  }
};

// 천 단위 format
export const getCountFormat = (count) => {
  if (isNaN(count)) {
    return 0;
  }

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}k`;
  } else if (count >= 1000 && count < 1000000) {
    return `${(count / 1000).toFixed(1)}k`;
  } else {
    return count;
  }
};

// markdown heading 추출
export const getMarkdownHeader = (title, contents) => {
  const headers = [];

  function getTocContents(line, isTitle) {
    const count = line.split('#').length - 1;
    const str = isTitle ? line : line.replace(' ', '').replace(/#/g, '').replace(/\\/g, '');

    let href = str.replace(/ /g, '-');
    href = '#' + href;

    return { href, text: str, count };
  }

  if (!title || !contents) {
    return headers;
  } else {
    // 제목 추출
    headers.push(getTocContents(title, true));

    // contents 추출
    contents.split('\n').map((line) => {
      if (line[0] === '#') {
        headers.push(getTocContents(line, false));
      }
    });
  }

  return headers;
};
