import {ADD_DISH_TO_CHECK, DELETE_DISH_FROM_CHECK, INIT_CHECK, RESET_CHECK} from "../actions/consts";

const prices = {};

const initialState = {
    check: [],
    totalPrice: 150
};

const checkReducer = ( state = initialState, action ) => {
    if(action.type === INIT_CHECK){
        const editState = {...state};
        const newState = Object.keys(action.data).map(elem => ({name: elem, quantity: 0, price: action.data[elem].price}));
        for(let i = 0; i < newState.length; i++){
            prices[newState[i].name] = newState[i].price
        }

        editState.check = newState;
        return editState
    }

    if(action.type === ADD_DISH_TO_CHECK){
        const newState = state.check;
        const index = state.check.findIndex(elem => elem.name === action.name);
        if( state.check[index].quantity !== 0 ){
            newState[index].quantity = newState[index].quantity + 1;
            newState[index].price = newState[index].price + prices[action.name]
        } else {
            newState[index].quantity = newState[index].quantity + 1;
        }
        return {...state, check: newState, totalPrice: state.totalPrice + prices[action.name]}
    };

    if(action.type === DELETE_DISH_FROM_CHECK){
        const newState = state.check;
        const index = state.check.findIndex(elem => elem.name === action.name);
        if( state.check[index].quantity > 1 ){
            newState[index].quantity = newState[index].quantity - 1;
            newState[index].price = newState[index].price - prices[action.name]
        } else {
            newState[index].quantity = newState[index].quantity - 1;
        }
        return {...state, check: newState, totalPrice: state.totalPrice - prices[action.name]}
    }

    if(action.type === RESET_CHECK){
        console.log('RESET')
        const resetCheck = state.check.map((elem, id) => ({name: elem.name ,price: prices[elem.name],  quantity: 0}));
        return {...state, check: resetCheck, totalPrice: 150 }
    }
    return state
};

export default checkReducer