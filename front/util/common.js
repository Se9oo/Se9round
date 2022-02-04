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
