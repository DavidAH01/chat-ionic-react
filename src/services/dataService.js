import axios from 'axios';
import * as firebase from 'firebase';

const getContacts = () => {
    return axios.get(`https://jsonplaceholder.typicode.com/users`);
}

const getChats = (myUser, response) => {
    const chatsList = firebase.database().ref('chats').child(myUser.id)
    return chatsList.on('value', snapshot => {
        if(!snapshot) return;
        response(snapshot.val() ? snapshot.val() : []);
    })
}

const updateChat = (data) => {
    const chatList1 = firebase.database().ref('chats').child(data.owner);
    const chatList2 = firebase.database().ref('chats').child(data.addressee);
    const dataToUpdate = {
        chatId: data.chatId,
        dateLastMessage: data.date,
        lastMessage: data.message,
    }
    chatList1.update({
        [data.addressee]:{
            ...dataToUpdate,
        }
    });
    chatList2.update({
        [data.owner]:{
            ...dataToUpdate,
        }
    });
}

const getMessages = (chatId, response) => {
    const messagesList = firebase.database().ref('messages').child(chatId)
    return messagesList.on('value', snapshot => {
        if(!snapshot) return;
        response(snapshot.val() ? snapshot.val() : []);
    })
}

const saveMessage = (data) => {
    const messagesList = firebase.database().ref('messages').child(data.chatId)
    messagesList.once('value', snapshot => {
        const messages = snapshot.val() ? snapshot.val() : [];
        messages.push({   
            message: data.message,
            date: new Date().getTime(),
            owner: data.owner
        })
        messagesList.update(messages);
        updateChat({
            chatId: data.chatId,
            owner: data.owner,
            addressee: data.addressee,
            date: new Date().getTime(),
            message: data.message
        })
    });
}

export {
    getContacts,
    getChats,
    getMessages,
    saveMessage
};