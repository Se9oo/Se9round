import React, { useEffect } from 'react';
import router from 'next/router';

import MainLayout from '../components/MainLayout';

const Se9round = () => {
  useEffect(() => {
    router.push('/home');
  }, []);

  return <MainLayout></MainLayout>;
};

export default Se9round;
