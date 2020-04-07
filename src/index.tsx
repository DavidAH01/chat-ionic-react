import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase'
import * as serviceWorker from './serviceWorker';

declare global {
  interface Window { plugins: any; }
}

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  appId: process.env.REACT_APP_FIREBASE_APPID
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
