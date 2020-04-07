import React from 'react';
import { IonItem, IonLabel } from '@ionic/react';

interface CustomInputProps {
  contact: any
}

const ContactItem: React.FC<CustomInputProps> = (props: any) => {
  const { contact } = props;

  return (
    <IonItem routerLink={`/main/chat/${contact.id}`}>
      <IonLabel>
        <h2>{contact.name}</h2>
        <h3>{contact.phone}</h3>
        <p>{contact.website}</p>
      </IonLabel>
    </IonItem>
  );
};

export default React.memo((props: any) => (<ContactItem {...props} />));