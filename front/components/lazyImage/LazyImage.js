import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@chakra-ui/react';

const LazyImage = ({ thumbnail }) => {
  const [isImgLoading, setIsImgLoading] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const imgObserver = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          setIsImgLoading(true);
        }
      });
    });

    imgRef.current && imgObserver.observe(imgRef.current);
  }, []);

  return (
    <Image
      src={isImgLoading ? thumbnail : '/assets/images/empty.png'}
      alt={isImgLoading ? 'thumbnail' : 'empty image'}
      position="absolute"
      w="100%"
      h="100%"
      top="0"
      left="0"
      objectFit="cover"
      ref={imgRef}
    />
  );
};

export default LazyImage;
