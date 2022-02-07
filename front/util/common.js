import dayjs from 'dayjs';

// markdown에서 첫번째 이미지 URL 추출 함수
export const getImgUrlByRegExp = (text) => {
  // 이미지 URL 추출 정규식
  const regExp = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/i;

  // 정규표현식에 해당하는 첫번째 이미지 추출
  const result = regExp.exec(text);

  if (result !== null && Array.isArray(result)) {
    return regExp.exec(text)[1];
  } else {
    return null;
  }
};

// date diff
export const getDateDiff = (regDt) => {
  const regDate = dayjs(regDt);
  const now = dayjs();

  if (now.diff(regDate, 'year') > 0) {
    return regDate.format('YYYY-MM-DD');
  } else if (now.diff(regDate, 'month') > 0) {
    return `${now.diff(regDate, 'month') > 0}달 전`;
  } else if (now.diff(regDate, 'day') > 0) {
    return `${now.diff(regDate, 'day')}일 전`;
  } else if (now.diff(regDate, 'h') > 0) {
    return `${now.diff(regDate, 'h')}시간 전`;
  } else if (now.diff(regDate, 'm') > 0) {
    return `${now.diff(regDate, 'm')}분 전`;
  } else if (now.diff(regDate, 's') > 0) {
    return `${now.diff(regDate, 's')}초 전`;
  } else {
    return regDate.format('YYYY-MM-DD');
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
