import React, { useEffect, useState } from 'react';
import {Message} from './types.ts';
import Chat from './components/Chat/Chat.tsx';
import MessageList from './components/MessageList/MessageList.tsx';
import axiosApi from './axiosApi.ts';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>('');

  const fetchMessages = async () => {
    try {
      let url = '/messages';
      if (lastDatetime) {
        url += `?datetime=${lastDatetime}`;
      }
      const response = await axiosApi.get<Message[]>(url);
      const data = response.data;
      if (data.length > 0) {
        setLastDatetime(data[data.length - 1].datetime);
        setMessages((prevMessages) => [...prevMessages, ...data]);
      }
    }catch (err) {
      console.error('Fetching error', err);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [lastDatetime]);

  const handleMessageSent = async () => {
    clearInterval(  setInterval(fetchMessages, 3000));
    await fetchMessages();
  };

  return (
    <div>
      <Chat onMessageSent={handleMessageSent} />
      <MessageList messages={messages} />
    </div>
  );
};

export default App;
