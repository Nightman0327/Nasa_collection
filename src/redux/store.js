import { combineReducers, configureStore } from "@reduxjs/toolkit";
import collectionReducer from './reducers/collection.reducer';
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
    collectionState: collectionReducer,
})

export default configureStore({
    reducer: rootReducer
}, composeWithDevTools);