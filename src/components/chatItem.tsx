import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';
import HumanTime from 'react-human-time';

interface CustomInputProps {
  chat: any
}

const ChatItem: React.FC<CustomInputProps> = (props: any) => {
  const { chat } = props;

  return (
    <IonItem routerLink={`/main/chat/${chat.id}`}>
      <IonLabel>
        <h2>{chat.name}</h2>
        <h3>{chat.lastMessage}</h3>
        <p><HumanTime time={chat.dateLastMessage} /></p>
      </IonLabel>
      
      { !!chat.unreadMessages && 
        <IonLabel className="content-unread-messages" slot="end">
          <span className="unread-messages" slot="end">{chat.unreadMessages}</span>
        </IonLabel>
      }
    </IonItem>
  );
};

export default ChatItem;