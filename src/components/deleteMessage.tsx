import React from 'react';
import { useStoreState } from 'easy-peasy';
import { deleteMessage } from '../services/dataService';
import { IonAlert, IonActionSheet } from '@ionic/react';

interface CustomInputProps {
  message: any,
  show: boolean,
  close: () => void,
}

const DeleteMessage: React.FC<CustomInputProps> = (props: any) => {
  const { message, show, close } = props;
  const myUser = useStoreState(state => state.user.data);
  const anotherUser = useStoreState(state => state.openChat.user);
  const [ showOptions, setShowOptions ] = React.useState(false);

  const confirmDelete = (type: string) => {
    deleteMessage(type, message.data, myUser, anotherUser, message.chatId)
  }

  return (
    <React.Fragment>
      <IonAlert
        isOpen={show}
        onDidDismiss={close}
        header={'¿Quieres borrar este mensaje?'}
        buttons={[
          {
            text: 'No',
            role: 'cancel',
            handler: () => close()
          },
          {
            text: 'Si, borrar',
            handler: () => setShowOptions(true)
          }
        ]}
      />
      <IonActionSheet
        isOpen={showOptions}
        onDidDismiss={() => setShowOptions(false)}
        buttons={[{
          text: 'Borrar para todos',
          role: 'destructive',
          cssClass: `${ message && message.data && message.data.owner == myUser.id ? '' : 'hidden'}`,
          handler: () => { confirmDelete('all') }
        },{
          text: 'Borrar para mi',
          role: 'destructive',
          handler: () => { confirmDelete('me') }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            setShowOptions(false)
          }
        }]}
      />
    </React.Fragment>
  );
};

export default React.memo((props: any) => <DeleteMessage message={props.message} show={props.show} close={props.close}/>);
