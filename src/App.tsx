import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store/store';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Navigation from './Navigation';

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
          <Route path="/main" component={Navigation} />
          <Route path="/" render={() => <Redirect to="/main/tabs/tab1" />} exact={true} />
        </IonReactRouter>
      </IonApp>
    </StoreProvider>
  )
};

export default App;
