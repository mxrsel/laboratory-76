import React, { useState } from 'react';

interface MessageFormProps {
  onMessageSent: () => void;
}

const Chat: React.FC<MessageFormProps> = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new URLSearchParams();
    data.set('message', message);
    data.set('author', author);

    await fetch('http://146.185.154.90:8000/messages', {
      method: 'POST',
      body: data,
    });

    setMessage('');
    setAuthor('');
    onMessageSent();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
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
