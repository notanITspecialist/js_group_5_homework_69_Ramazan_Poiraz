import {ADD_DISH_TO_CHECK, DELETE_DISH_FROM_CHECK, INIT_CHECK, MENU_ERROR, MENU_REQUEST, MENU_RESPONSE} from "./consts";
import axios from "axios";

export const menuRequest = () => ({type: MENU_REQUEST});
export const menuResponse = data => ({type: MENU_RESPONSE, data});
export const menuError = () => ({type: MENU_ERROR});

export const initCheck = data => ({type: INIT_CHECK, data});

export const getMenu = () => async dispatch => {
    dispatch(menuRequest());
    const data = await axios.get('https://lesson-69-ramazan.firebaseio.com/menu.json');
    try {
        dispatch(menuResponse(data.data));
        dispatch(initCheck(data.data));
    } catch(e) {
        dispatch(menuError())
    }
};

export const sendOrder = async data => {
    await axios.post('https://lesson-69-ramazan.firebaseio.com/orders.json', data);
};

export const addDishToCheck = name => ({type: ADD_DISH_TO_CHECK, name});

export const deleteDishFromCheck = name => ({type: DELETE_DISH_FROM_CHECK, name});