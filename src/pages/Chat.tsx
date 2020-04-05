import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { getMessages, saveMessage, offMessagesConnection, markAsReadMessages } from '../services/dataService';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonGrid, IonRow, IonCol, IonInput, IonButton, IonButtons, IonIcon } from '@ionic/react';
import HumanTime from 'react-human-time';
import { arrowBackOutline, checkmarkOutline, checkmarkDoneOutline } from 'ionicons/icons';
import './Chat.css';

const Chat: React.FC = (props: any) => {
    const { match, history } = props;
    const mainContent = React.useRef<any>();
    const [ chatId, setChatId ] = React.useState()
    const [message, setMessage] = React.useState()
    const myUser = useStoreState(state => state.user.data);
    const anotherUser = useStoreState(state => state.openChat.user);
    const contacts = useStoreState(state => state.contacts.list);
    const chats = useStoreState(state => state.chats.list);
    const messages = useStoreState(state => state.openChat.messages);
    const loadMessages = useStoreActions((actions: any) => actions.openChat.loadMessages);
    const setUser = useStoreActions((actions: any) => actions.openChat.setUser);
    const scrollToBottom = () => {
        mainContent.current.scrollToBottom()
    }
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
        markAsReadMessages(messages, myUser, anotherUser, chatId);
        return messages.map((data: any, index: number) => {
            return (
                <div className={ `bubble-chat ${ data.owner == myUser.id ? 'bubble-chat--mine' : '' }` } 
                    key={`message-${index}`}>
                    <p>{data.message}</p>
                    <span className="content-meta-data"> 
                        <HumanTime time={data.date} />
                        <IonIcon icon={ !data.read ? checkmarkOutline : checkmarkDoneOutline } />
                    </span>
                </div>
            );
        })
    }
    const sendMessage = async() => {
        await saveMessage({
            message,
            chatId,
            owner: myUser.id,
            addressee: anotherUser.id
        })
        setMessage("");
    }
    React.useEffect(() => {
        getContactByID(match.params.userId);
    }, []);

    React.useEffect(() => {
        if(Object.values(anotherUser).length) validateChatID();
    }, [anotherUser]);

    React.useEffect(() => {
        async function getData() {
            await getMessages(chatId, loadMessages)
        }
        if(Object.values(anotherUser).length && chatId){
            getData();
        }
        return () => {
            if(Object.values(anotherUser).length && chatId){ offMessagesConnection(chatId) }
            loadMessages([])
        }
    }, [chatId]);

    React.useEffect(() => {
        if(messages.length){
            setTimeout(() => {
                scrollToBottom();
            }, 500)
        }
    }, [messages]);

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
            <IonContent ref={mainContent}>
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
