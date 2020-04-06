import { createStore, persist, action, thunk } from 'easy-peasy';
import { getContacts } from '../services/dataService';
import { v4 as uuidv4 } from 'uuid';

const model = {
    contacts: {
        list: [],
        getContacts: thunk(async (actions) => {
            const data = await getContacts();
            data.data.push({
                id: "6e394fa2-c575-4ef4-aaca-3ed9b29959ed",
                name: "David Ardila",
                phone: "1312312332",
                email: "dasdas@dasd.co"
            });
            actions.loadContacts(data.data);
        }),
        loadContacts: action((state, payload) => {
            state.list = [...payload];
        })
    },
    chats: {
        list: [],
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
        create: action((state, payload) => {
            payload.id = uuidv4(); 
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
