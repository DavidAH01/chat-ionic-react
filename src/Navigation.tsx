import React from 'react';
import { useStoreState } from 'easy-peasy';
import { Route } from 'react-router-dom';
import { IonPage } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { oneSignalInit } from './services/oneSignalService';
import Tabs from './pages/Tabs';
import Chat from './pages/Chat';

const Navigation: React.FC = (props: any) => {
  const { match } = props;
  const history: any = useStoreState(state => state.navigation.history);
  const [ redirect, setRedirect ] = React.useState()

  React.useEffect(() => {
    oneSignalInit(setRedirect)
  }, [])

  React.useEffect(() => {
    if(!redirect) return;
    history.push(redirect)
  }, [redirect])

  return (
    <IonPage>
      <IonReactRouter>
        <Route path={`${match.url}/tabs`} component={Tabs} />
        <Route path={`${match.url}/chat/:userId`} component={Chat} />
      </IonReactRouter> 
    </IonPage>
  )
};

export default Navigation;