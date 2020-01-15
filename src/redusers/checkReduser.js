import {ADD_DISH_TO_CHECK, DELETE_DISH_FROM_CHECK, INIT_CHECK} from "../actions/consts";

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
        const index = state.check.findIndex(elem => elem.name === action.name);
        if(state.check[index].quantity !== 0){
            return {...state, check: [
                    ...state.check,
                    state.check[index].quantity = state.check[index].quantity + 1,
                    state.check[index].price = state.check[index].price + prices[action.name]
                ],totalPrice: state.totalPrice + prices[action.name]}
        }
        return {...state, check: [
            ...state.check,
                state.check[index].quantity = state.check[index].quantity + 1
            ],totalPrice: state.totalPrice + prices[action.name]}
    }

    if(action.type === DELETE_DISH_FROM_CHECK){
        const index = state.check.findIndex(elem => elem.name === action.name);
        if(state.check[index].quantity > 1){
            return {...state, check: [
                    ...state.check,
                    state.check[index].quantity = state.check[index].quantity - 1,
                    state.check[index].price = state.check[index].price - prices[action.name]
                ],totalPrice: state.totalPrice - prices[action.name]}
        }
        return {...state, check: [
                ...state.check,
                state.check[index].quantity = state.check[index].quantity - 1
            ],totalPrice: state.totalPrice - prices[action.name]}
    }
    return state
};

export default checkReducer