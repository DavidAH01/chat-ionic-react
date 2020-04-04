import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { getMessages, saveMessage } from '../services/dataService';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonGrid, IonRow, IonCol, IonInput, IonButton, IonButtons, IonIcon } from '@ionic/react';
import HumanTime from 'react-human-time';
import { arrowBackOutline } from 'ionicons/icons';
import './Chat.css';

const Chat: React.FC = (props: any) => {
    const { match, history } = props;
    const [ chatId, setChatId ] = React.useState()
    const [message, setMessage] = React.useState()
    const myUser = useStoreState(state => state.user.data);
    const anotherUser = useStoreState(state => state.openChat.user);
    const contacts = useStoreState(state => state.contacts.list);
    const chats = useStoreState(state => state.chats.list);
    const messages = useStoreState(state => state.openChat.messages);
    const loadMessages = useStoreActions((actions: any) => actions.openChat.loadMessages);
    const setUser = useStoreActions((actions: any) => actions.openChat.setUser);
    const getContactByID = (userId: number) => {
        const user = contacts.filter((contact: any) => contact.id == userId)[0];
        if(!user) return history.goBack();
        setUser(user)
    }
    const validateChatID = () => {
        const user = chats.filter((user: any) => user.id == anotherUser.id)[0];
        const chatId = user ? user['chatId'] : uuidv4()
        setChatId(chatId ? chatId : uuidv4())
    }
    const renderMessages = () => {
        return messages.map((data: any, index: number) => {
            return (
                <div className={ `bubble-chat ${ data.owner == myUser.id ? 'bubble-chat--mine' : '' }` } 
                    key={`message-${index}`}>
                    <p>{data.message}</p>
                    <span><HumanTime time={data.date} /></span>
                </div>
            );
        })
    }
    const sendMessage = () => {
        saveMessage({
            message,
            chatId,
            owner: myUser.id,
            addressee: anotherUser.id
        })
        setMessage("");
    }
    React.useEffect(() => {
        getContactByID(parseInt(match.params.userId));
    }, []);

    React.useEffect(() => {
        if(Object.values(anotherUser).length) validateChatID();
    }, [anotherUser]);

    React.useEffect(() => {
       if(Object.values(anotherUser).length && chatId) getMessages(chatId, loadMessages);
    }, [chatId]);

    return (
        <IonPage className="chat-view">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => history.goBack()}>
                            <IonIcon slot="icon-only" icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{ anotherUser && anotherUser.name ? anotherUser.name : 'Chat' }</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                { renderMessages() }
            </IonContent>
            <IonFooter>
                <IonGrid>
                    <IonRow>
                        <IonCol size="8">
                            <IonInput value={message} placeholder="Escríbe aquí" onIonChange={(e: any) => setMessage(e.detail.value)}></IonInput>
                        </IonCol>
                        <IonCol>
                            <IonButton size="small" onClick={sendMessage}>Enviar</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonFooter>
        </IonPage>
    );
};

export default Chat;
