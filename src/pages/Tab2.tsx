import React from 'react';
import { useStoreState } from 'easy-peasy';
import HumanTime from 'react-human-time';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/react';
import Login from '../components/login';
import './Tab2.css';

const Tab2: React.FC = (props: any) => {
  const { history } = props;
  const chats = useStoreState(state => state.chats.list);

  const renderChats = () => {
    return chats.map((chat: any) => {
      return (
        <IonItem key={`chat-${chat.id}`} onClick={(e: any) => {
          e.preventDefault();
          history.push(`/chat/${chat.id}`);
        }}>
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
      )
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chats</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Login />
        { renderChats() }
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
