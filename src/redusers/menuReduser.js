import {MENU_RESPONSE} from "../actions/consts";

const initialState = {
  menu: {}
};

const menuReducer = ( state = initialState, action ) => {
    if(action.type === MENU_RESPONSE){
        return {...state, menu: action.data}
    }

    return state
};

export default menuReducer