import { createStore, persist, action, thunk } from 'easy-peasy';
import { getContacts } from '../services/dataService';
import { v4 as uuidv4 } from 'uuid';

const model = {
    contacts: {
        list: [],
        getContacts: thunk(async (actions) => {
            console.log('hire')
            const data = await getContacts();
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
        setUser: action((state, payload) => {
            state.user = {...payload};
        }),
        loadMessages: action((state, payload) => {
            state.messages = [...payload];
        }),
    },
    user: {
        data: {},
        create: action((state, payload) => {
            payload.id = uuidv4(); 
            state.data = {...payload}
        })
    }
};

const store = createStore(persist(model, { 
        whitelist: ['contacts', 'user'],
        storage: 'localStorage'
    })
);

export default store;
