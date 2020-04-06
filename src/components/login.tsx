import React from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { IonAlert } from '@ionic/react';

const Login: React.FC = () => {
  const user = useStoreState(state => state.user.data);
  const createUser = useStoreActions((actions: any) => actions.user.create);

  const [openUserAlert, setOpenUserAlert] = React.useState(false);

  React.useEffect(() => {
    if(!user || !user.id){
      setOpenUserAlert(true)
    }
  }, [])

  return (
    <IonAlert
      isOpen={openUserAlert}
      onDidDismiss={() => setOpenUserAlert(false)}
      header={'¿Cúal es tu nombre?'}
      backdropDismiss={false}
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
  );
};

export default React.memo(() => (<Login />));