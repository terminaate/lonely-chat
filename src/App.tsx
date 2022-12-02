import React, { useLayoutEffect, useState } from 'react';
import LoginModal from '@/components/LoginModal';
import MessagesPage from '@/pages/MessagesPage';
import { useAppDispatch } from '@/store';
import { login } from '@/store/reducers/userSlice';
import ErrorBoundary from '@/components/ErrorBoundary';

const App = () => {
  const [loginModal, setLoginModal] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (sessionStorage.getItem('name')) {
      dispatch(login(sessionStorage.getItem('name')!));
      setLoginModal(false);
    }
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <LoginModal visible={loginModal} setVisible={setLoginModal} />
      <MessagesPage />
    </ErrorBoundary>
  );
};

export default App;
