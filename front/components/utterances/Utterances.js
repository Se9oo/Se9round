import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

const Utterances = () => {
  const ref = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'Se9oo/Se9round');
    script.setAttribute('issue-term', 'title');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('label', 'blog-comment');
    ref.current.appendChild(script);
  }, []);

  return <Box ref={ref} />;
};

export default Utterances;
