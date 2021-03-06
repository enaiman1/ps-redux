/*
The combineReducers helper function turns an object whose values are different reducing 
functions into a single reducing function you can pass to createStore.
*/
import { combineReducers} from 'redux';
import courses from './courseReducers';
import authors from "./authorReducer"
import apiCallsInProgress from "./apiStatusReducer"

// this will combine all of our reducers together
const rootReducer = combineReducers({
    courses,
    authors,
    apiCallsInProgress
})

export default rootReducer