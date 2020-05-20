export default function courseReducer(state = [], action){
 switch(action.type) {
     case "CREATE_COURSE":
        //  whatever is returned becomes the new reducer
        return [...state, {...action.course}];
     default:
         return state;
 }
}