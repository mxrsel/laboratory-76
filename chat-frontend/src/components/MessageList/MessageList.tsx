import React from 'react';
import {Message} from '../../types.ts';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message._id}>
          <strong>{message.author}</strong>: {message.message} <strong>({new Date(message.datetime).toLocaleString()})</strong>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
