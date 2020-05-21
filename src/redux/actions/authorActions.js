import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi'
import {beginApiCall} from "./apiStatusActions"


// this function does not fire until Authors return from our api call
export function loadAuthorsSuccess(authors){
    return { type: types.LOAD_AUTHORS_SUCCESS, authors }
}


export function loadAuthors(){
    return function (dispatch){
        dispatch(beginApiCall())
        return authorApi.getAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors))
        }).catch(error =>{
            throw error;
        })
    }
}

// export function looks like this because it utlized by thunk middleware..
// Thunk middleware passes dispatch as an argument to our thunk
// Redux thunk injects dispatch so we dont have to