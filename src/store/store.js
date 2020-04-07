import { createStore, persist, action, thunk, computed } from 'easy-peasy';
import { getContacts } from '../services/dataService';
import { getUserId } from '../services/oneSignalService';
import { v4 as uuidv4 } from 'uuid';

const model = {
    navigation:{
        history: {},
        setNavigation: action((state, payload) => {
            state.history = {...payload};
        })
    },
    contacts: {
        list: [],
        getContacts: thunk(async (actions) => {
            const data = await getContacts();
            data.data.push({
                id: "7d20ad9d-db4e-42d0-84c5-4ae2430e4b58",
                name: "David Ardila",
                phone: "1312312332",
                email: "dasdas@dasd.co"
            });
            actions.loadContacts(
                data.data.map(contact => {
                    contact.onesignalId = `9c46ad13-95bc-49fc-b7a9-2d6c95ac4d2c`
                    return contact;
                })
            );
        }),
        loadContacts: action((state, payload) => {
            state.list = [...payload];
        })
    },
    chats: {
        list: [],
        unreadMessages: computed(state => {
            if(!state.list.length) return 0;
            return state.list.reduce((count, chat) => {
                return count + chat.unreadMessages
            }, 0)
        }),
        loadChats: action((state, payload) => {
            state.list = [...payload];
        })
    },
    openChat: {
        user: {},
        messages: [],
        messageToDelete:{},
        setUser: action((state, payload) => {
            state.user = {...payload};
        }),
        loadMessages: action((state, payload) => {
            state.messages = [...payload];
        }),
        selectMessagesToDelete: action((state, payload) => {
            state.messageToDelete = {...payload};
        }),
    },
    user: {
        data: {},
        create: thunk(async(actions, payload) => {
            payload.id = uuidv4(); 
            payload.onesignalId = await getUserId();
            actions.saveUser({...payload});
        }),
        saveUser: action(async(state, payload) => {
            state.data = {...payload};
        })
    }
};

const store = createStore(persist(model, { 
        whitelist: ['contacts', 'user'],
        storage: 'localStorage'
    })
);

export default store;
