import React, { useEffect, useState } from 'react';
import {Message} from './types.ts';
import Chat from './components/Chat/Chat.tsx';
import MessageList from './components/MessageList/MessageList.tsx';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>('');

  const fetchMessages = async () => {
    let url = 'http://146.185.154.90:8000/messages';
    if (lastDatetime) {
      url += `?datetime=${lastDatetime}`;
    }
    const response = await fetch(url);
    const data: Message[] = await response.json();
    if (data.length > 0) {
      setLastDatetime(data[data.length - 1].datetime);
      setMessages((prevMessages) => [...prevMessages, ...data]);
    }
  };



  useEffect(() => {
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [lastDatetime]);

  const handleMessageSent = async () => {
    const interval = setInterval(fetchMessages, 3000);
    clearInterval(interval);
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
