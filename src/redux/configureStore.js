// creates redux store, adds redux middleware
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
// redux middleware to help prevent state mutation
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from 'redux-thunk'

export default function configureStore(initialState){
    // adds support for Redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


    return createStore(
        rootReducer, 
        initialState, 
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
        );
}
