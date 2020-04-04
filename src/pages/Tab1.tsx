import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonAlert } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = (props: any) => {
  const { history } = props;
  const contacts = useStoreState(state => state.contacts.list);

  const user = useStoreState(state => state.user.data);
  const createUser = useStoreActions((actions: any) => actions.user.create);

  const [openUserAlert, setOpenUserAlert] = React.useState(false);

  React.useEffect(() => {
    if(!user || !user.id){
      setOpenUserAlert(true)
    }
  }, [])

  const renderContacts = () => {
    return contacts.map((contact: any) => {
      return (
        <IonItem key={`contact-${contact.id}`} onClick={(e: any) => {
          e.preventDefault();
          history.push(`/chat/${contact.id}`);
        }}>
          <IonLabel>
            <h2>{contact.name}</h2>
            <h3>{contact.phone}</h3>
            <p>{contact.website}</p>
          </IonLabel>
        </IonItem>
      )
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
      <IonAlert
          isOpen={openUserAlert}
          onDidDismiss={() => setOpenUserAlert(false)}
          header={'¿Cúal es tu nombre?'}
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Escríbelo aquí'
            },
          ]}
          buttons={[
            {
              text: 'Guardar',
              handler: (data) => {
                createUser({ name: data.name })
              }
            }
          ]}
        />

        {renderContacts()}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
