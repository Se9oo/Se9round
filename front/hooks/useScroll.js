import { useEffect, useState } from 'react';

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isShowHeader, setIsShowHeader] = useState(true);

  const throttle = (callback, delay) => {
    let timer;
    return () => {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          callback();
        }, delay);
      }
    };
  };

  const checkScroll = () => {
    if (window.scrollY > scrollY) {
      setIsShowHeader(false);
    } else {
      setIsShowHeader(true);
    }
    setScrollY(window.scrollY);
  };

  const handleScroll = throttle(checkScroll, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return { scrollY, isShowHeader };
};

export default useScroll;
