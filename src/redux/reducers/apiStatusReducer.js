import * as types from "../actions/actionTypes";
import initialState from './initialState';

// helper function will determing if the action type will end in success(by using substring)
function actionTypesEndsInSuccess(type){
    return type.substring(type.length - 8) === "_SUCCESS"
}

export default function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action
) {
    if (action.type === types.BEGIN_API_CALL){
        return state + 1;
    } else if (actionTypesEndsInSuccess(action.type)) {
        return state - 1;
    }
    return state;
}