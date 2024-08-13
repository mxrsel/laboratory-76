import React, { useState } from 'react';
import axiosApi from '../../axiosApi.ts';
import {TextField} from '@mui/material';

interface MessageFormProps {
  onMessageSent: () => void;
}

const Chat: React.FC<MessageFormProps> = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   if(!author || !message) {
     return;
   }

   try{
     await axiosApi.post('/messages', { author, message });
     setMessage('');
     setAuthor('');
     onMessageSent()
   }catch(err){
     console.error('Error sending message:', err)
   }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <TextField
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default Chat;
