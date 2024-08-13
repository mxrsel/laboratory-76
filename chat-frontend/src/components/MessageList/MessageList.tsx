import React from 'react';
import {Message} from '../../types.ts';
import {List, ListItemText, Typography} from '@mui/material';
import dayjs from 'dayjs';



interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <List>
      {messages.map((msg) => (
        <div key={msg.id}>
          <ListItemText
            primary={<Typography variant="body1"><strong>{msg.author}</strong>: {msg.message}</Typography>}
            secondary={dayjs(msg.datetime).format('DD.MM.YYYY HH:mm')}
          />
        </div>
      ))}
    </List>
  );
};

export default MessageList;
