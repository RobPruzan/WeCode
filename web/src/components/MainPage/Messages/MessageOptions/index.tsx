import React, { useState } from 'react';
import MessageOption from './MessageOption';

export const MessageOptions = () => {
  const [messages, setMessages] = useState([1, 2, 3, 4, 5]);
  return (
    <>
      {messages.map(message => {
        return <MessageOption />;
      })}
    </>
  );
};

export default MessageOptions;
