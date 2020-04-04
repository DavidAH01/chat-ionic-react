import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { Redirect, Route } from 'react-router-dom';
import store from './store/store';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Tabs from './pages/Tabs';
import Chat from './pages/Chat';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <IonApp>
        <IonReactRouter>
          <Route path="/tabs" component={Tabs} />
          <Route path="/chat/:userId/:chatId?" component={Chat} />
          <Route path="/" render={() => <Redirect to="/tabs/tab1" />} exact={true} />
        </IonReactRouter>
      </IonApp>
    </StoreProvider>
  )
};

export default App;
