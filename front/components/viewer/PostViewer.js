import React from 'react';
import dynamic from 'next/dynamic';

const DynamicPostViewer = dynamic(() => import('./Viewer'), { ssr: false });

const PostViewer = ({ contents }) => {
  return <DynamicPostViewer contents={contents} />;
};

export default PostViewer;
