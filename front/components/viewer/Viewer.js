import React from 'react';
import { Viewer as TuiViewer } from '@toast-ui/react-editor';
import { Box } from '@chakra-ui/react';

const Viewer = ({ contents }) => {
  return (
    <Box w="100%" bg="white" borderRadius="2rem" p="1rem">
      <TuiViewer initialValue={contents} height="600px" />
    </Box>
  );
};

export default Viewer;
