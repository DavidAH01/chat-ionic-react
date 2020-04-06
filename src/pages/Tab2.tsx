import React from 'react';
import { useStoreState } from 'easy-peasy';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/react';
import ChatItem from '../components/chatItem';
import Login from '../components/login';
import './Tab2.css';

const Tab2: React.FC = (props: any) => {
  const chats = useStoreState(state => state.chats.list);

  const renderChats = () => {
    return chats.map((chat: any) => {
      return <ChatItem key={`chat-${chat.id}`} chat={chat}/>
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
