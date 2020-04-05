import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as firebase from 'firebase'
import * as serviceWorker from './serviceWorker';

const config = {
    apiKey: "AIzaSyAs2aYlz_L60Cpb3OQGhBsIbXiFif4wnx4",
    authDomain: "react-chat-b954e.firebaseapp.com",
    databaseURL: "https://react-chat-b954e.firebaseio.com",
    projectId: "react-chat-b954e",
    storageBucket: "react-chat-b954e.appspot.com",
    messagingSenderId: "653743368725",
    appId: "1:653743368725:web:8f07a7fa8d8d61c6737c1c"
}
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
