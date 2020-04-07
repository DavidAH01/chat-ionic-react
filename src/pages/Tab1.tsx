import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ContactItem from '../components/contactItem';
import Login from '../components/login';
import './Tab1.css';

const Tab1: React.FC = (props: any) => {
  const { history } = props;
  const contacts = useStoreState(state => state.contacts.list);
  const setNavigation = useStoreActions((actions: any) => actions.navigation.setNavigation);

  React.useEffect(() => {
    setNavigation(history)
  }, []);

  const renderContacts = () => {
    return contacts.map((contact: any) => {
      return <ContactItem key={`contact-${contact.id}`} contact={contact} />
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Login />
        {renderContacts()}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
