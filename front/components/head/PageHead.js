import React from 'react';
import Head from 'next/head';

const PageHead = ({ title, description, keywords, thumbnail }) => {
  const thumbnailImg = thumbnail ? thumbnail : '/assets/images/empty.png';
  const desc = description ? description : 'se9oo의 개발 블로그';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      {keywords && keywords.length > 0 && <meta name="keywords" content={keywords.join(',')} />}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://se9round.dev" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={thumbnailImg} />
      <meta property="og:description" content={desc} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://se9round.dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={thumbnailImg} />
    </Head>
  );
};

export default PageHead;
