import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import shopReducer from "./shopReducer";
import productReducer from "./productReducer";
import chatsReducer from "./chatsReducer";


const rootReducer = combineReducers({
    user: userReducer,
    shop: shopReducer,
    product: productReducer,
    chats: chatsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))