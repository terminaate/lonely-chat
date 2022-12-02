import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import useInputState from '@/hooks/useInputState';
import { useAppSelector } from '@/store';
import { Button, Card, Form, Stack } from 'react-bootstrap';

type MessageProps = {
  id: number;
  text: string;
  author: string;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [messageInput, onMessageInputChange, setMessageInput] = useInputState('');
  const { name } = useAppSelector(state => state.userSlice.user);
  const containerRef = useRef<HTMLDivElement>(null);

  const onStorageChange = useCallback(() => {
    const localMessages = localStorage.getItem('messages');
    if (localMessages !== JSON.stringify(messages)) {
      setMessages(JSON.parse(localMessages!));
      containerRef.current?.scrollTo({ top: containerRef?.current.clientHeight, behavior: 'smooth' });
    }
  }, []);

  const parseMessages = () => {
    const localMessages = localStorage.getItem('messages');
    if (!localMessages) {
      localStorage.setItem('messages', '[]');
    } else if ((JSON.parse(localMessages) as MessageProps[]).length) {
      setMessages(JSON.parse(localMessages));
    }
  };

  useEffect(() => {
    parseMessages();

    window.addEventListener('storage', onStorageChange);
    return () => {
      window.removeEventListener('storage', onStorageChange);
    };
  }, []);

  const onMessageSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (messageInput) {
      const newMessage: MessageProps = {
        id: Date.now(),
        text: messageInput,
        author: name!,
      };
      localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
      window.dispatchEvent(new Event('storage'));
      setMessageInput('');
    }
  };

  return (
    <Stack gap={3} className={'p-4 h-100'}>
      <Stack gap={3} className={'h-75 overflow-scroll'} ref={containerRef}>
        {messages.map((message, key) => (
          <Card key={key} {...(message.author === name && {bg: "primary", text: "white"})}>
            <Card.Header>{message.author}</Card.Header>
            <Card.Body>
              {message.text}
            </Card.Body>
          </Card>
        ))}
      </Stack>
      <Form onSubmit={onMessageSubmit}>
        <Form.Label>Message text:</Form.Label>
        <Stack direction={'horizontal'}>
          <Form.Control type='text' value={messageInput} onChange={onMessageInputChange}
                        placeholder={'Enter message'} />
          <Button type={'submit'}>Send</Button>
        </Stack>
      </Form>
    </Stack>
  );
};

export default MessagesPage;