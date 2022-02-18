import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import useDeepCompareEffect from 'use-deep-compare-effect';

const useAlert = () => {
  const [alertProps, setAlertProps] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openAlert = (props) => {
    setAlertProps(props);
  };

  useEffect(() => {
    if (alertProps.title !== null && alertProps.title !== undefined) {
      // alert open
      onOpen();
    }
  }, [alertProps]);

  return { isOpen, openAlert, alertProps, onClose };
};

export default useAlert;
