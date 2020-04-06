import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Route } from 'react-router-dom';
import { getChats, offFBConnection } from '../services/dataService';
import { IonTabs, IonRouterOutlet, IonPage, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { people, chatbubbles } from 'ionicons/icons';

import Tab1 from './Tab1';
import Tab2 from './Tab2';

const Tabs: React.FC = (props: any) => {
  const { match } = props
  const myUser = useStoreState(state => state.user.data);
  const contacts = useStoreState(state => state.contacts.list);
  const getContacts = useStoreActions((actions: any) => actions.contacts.getContacts);
  const loadChats = useStoreActions((actions: any) => actions.chats.loadChats);
  const unreadMessages = useStoreState(state => state.chats.unreadMessages);

  const onChangeChats = (chats: any) => {
    loadChats(
      Object.keys(chats).reduce((users: any, currentValue: any) => {
        console.log(currentValue)
        const user = contacts.filter((contact: any) => contact.id == currentValue )[0];
        if(user) { 
          user['chatId'] = chats[currentValue].chatId; 
          user['lastMessage'] = chats[currentValue].lastMessage;
          user['dateLastMessage'] = chats[currentValue].dateLastMessage; 
          user['unreadMessages'] = chats[currentValue].unreadMessages; 
          users = [...users, user]
        }
        return users
      }, [])
    )
  }

  React.useEffect(() => {
    if(Object.keys(myUser).length && !contacts.length) getContacts();
  }, [myUser])

  React.useEffect(() => {
    if(contacts.length) getChats(myUser, onChangeChats);

    return () => {
      if(contacts.length) offFBConnection();
    }
  }, [contacts])

  return (
    <IonPage>
      <IonTabs>
          <IonRouterOutlet>
            <Route path={`${match.url}/tab1`}  component={Tab1} exact={true} />
            <Route path={`${match.url}/tab2`}  component={Tab2} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tabs/tab1">
              <IonIcon icon={people} />
              <IonLabel>Contactos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tabs/tab2">
              <IonIcon icon={chatbubbles} />
              <IonLabel>
                Chats
              </IonLabel>
              { !!unreadMessages && <span className="unread-messages-bridge">{unreadMessages}</span>}
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
    </IonPage>
  );
};

export default Tabs;
