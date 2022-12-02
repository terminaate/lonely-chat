import React, { FC, FormEvent } from 'react';
import { useAppDispatch } from '@/store';
import useInputState from '@/hooks/useInputState';
import { login } from '@/store/reducers/userSlice';
import { Button, Form, Modal } from 'react-bootstrap';

interface ILoginModal {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}

const LoginModal: FC<ILoginModal> = ({ setVisible, visible }) => {
  const dispatch = useAppDispatch();
  const [loginInput, onLoginInputChange] = useInputState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loginInput) {
      dispatch(login(loginInput));
      setVisible(false);
    }
  };

  return (
    <Modal show={visible}>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className={'mb-3'}>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder={'Enter username'}
              value={loginInput}
              onChange={onLoginInputChange}
            />
          </Form.Group>
          <Button type={'submit'}>Sign in</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
