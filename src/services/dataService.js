import axios from 'axios';
import * as firebase from 'firebase';

const connections = {};

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
    const chatList1 = firebase.database().ref('chats').child(data.owner).child(data.addressee);
    const chatList2 = firebase.database().ref('chats').child(data.addressee).child(data.owner);
    const dataToUpdate = {
        chatId: data.chatId,
        dateLastMessage: data.date,
        lastMessage: data.message
    }
    try{
        chatList1.update({
            ...dataToUpdate
        });
        chatList2.update({
            ...dataToUpdate,
            unreadMessages: data.unreadOwnMessages
        });
    }catch(err){
        chatList1.set({
            ...dataToUpdate
        });
        chatList2.set({
            ...dataToUpdate,
            unreadMessages: data.unreadOwnMessages
        });
    }
}

const getMessages = (chatId, response) => {
    const messagesList = firebase.database().ref('messages').child(chatId)
    connections[chatId] = messagesList;
    return messagesList.on('value', snapshot => {
        if(!snapshot) return;
        response(snapshot.val() ? snapshot.val() : []);
    })
}

const offMessagesConnection = (chatId) => {
    connections[chatId].off('value');
    delete connections[chatId];
}

const saveMessage = (data) => {
    const messagesList = firebase.database().ref('messages').child(data.chatId)
    return messagesList.once('value', snapshot => {
        const messages = snapshot.val() ? snapshot.val() : [];
        messages.push({   
            message: data.message,
            date: new Date().getTime(),
            owner: data.owner,
            read: false
        })
        messagesList.update(messages);
        updateChat({
            chatId: data.chatId,
            owner: data.owner,
            addressee: data.addressee,
            date: new Date().getTime(),
            message: data.message,
            unreadOwnMessages: messages.reduce((count, currentValue) => {
                if(!currentValue.read && currentValue.owner == data.owner) return count + 1;
                return count;
            }, 0)
        })
    });
}

const markAsReadMessages = (messages, myUser, anotherUser, chatId) => {
    if(!chatId || !messages.length) return;
    const messagesList = firebase.database().ref('messages').child(chatId);
    const chatList = firebase.database().ref('chats').child(myUser.id).child(anotherUser.id);
    chatList.update({
                unreadMessages: 0
            });
    messagesList.update(
        messages.map(item => {
            if(item['owner'] != myUser.id) item['read'] = true;
            return item; 
        })
    );
}

const deleteMessage = (type, message, myUser, anotherUser, chatId) => {
    const messagesList = firebase.database().ref('messages').child(chatId)
    return messagesList.once('value', snapshot => {
        const messages = snapshot.val() ? snapshot.val() : [];
        if(type === 'all'){
            console.log('hi')
            messages[message.index].message = "El mensaje ha sido eliminado";
            messages[message.index].deleted = [myUser.id, anotherUser.id];
        }else if(!messages[message.index].deleted && type === 'me'){
            messages[message.index].deleted = [myUser.id];
        }else{
            messages[message.index].message = "El mensaje ha sido eliminado";
            messages[message.index].deleted.push(myUser.id);
        }
        messages[message.index].deletedBy = myUser.id;
        messagesList.set(messages);
        if(messages.length-1 === message.index && (type === 'all' ||  messages[message.index].deleted.length === 2)){
            updateChat({
                chatId: chatId,
                owner: myUser.id,
                addressee: anotherUser.id,
                date: new Date().getTime(),
                message: '',
                unreadOwnMessages: messages.reduce((count, currentValue) => {
                    if(!currentValue.read && currentValue.owner == myUser.id) return count + 1;
                    return count;
                }, 0)
            })
        }
    });
}

export {
    getContacts,
    getChats,
    getMessages,
    offMessagesConnection,
    saveMessage,
    markAsReadMessages,
    deleteMessage
};