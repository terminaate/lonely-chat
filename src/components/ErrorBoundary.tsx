import React, { FC, ReactNode, useEffect, useState } from 'react';
import { ErrorBoundary as ErrorBoundaryHandler } from 'react-error-boundary';
import { Button, Modal } from 'react-bootstrap';

interface IErrorBoundary {
  children: ReactNode;
}

interface IErrorFallback {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: FC<IErrorFallback> = ({ error, resetErrorBoundary }) => {
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    console.log('Unexpected error', error);
  }, []);

  const resetError = () => {
    resetErrorBoundary();
    setState(false);
  };

  return (
    <Modal show={state}>
      <Modal.Header>
        <Modal.Title>Произошла неизвестная ошибка ;(</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={resetError}>Попрбовать снова</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ErrorBoundary: FC<IErrorBoundary> = ({ children }) => {
  return (
    <ErrorBoundaryHandler FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundaryHandler>
  );
};

export default ErrorBoundary;
