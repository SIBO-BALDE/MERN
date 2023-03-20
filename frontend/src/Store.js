//Les contexts leur roles est de descendre l'information de parents à enfant

import { createContext, useReducer } from "react";
// pour aficher le cart et le nombre d'articles commander sur le navebar we create react   context to save shopping  cart item
export const Store = createContext();


const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
       : [],
    },
};
function reducer(state, action) {
    switch (action.type) {
        // update action to rhe cart
        case 'CART_ADD_ITEM':
            //add to cart code for add item in the cart
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(
            (item) => item._id ===newItem._id
            );
            const cartItems =existItem 
            ? state.cart.cartItems.map((item)=>
             item._id === existItem._id ? newItem : item)
           : [...state.cart.cartItems,newItem];
        //   STOKER DES PRODUITSDU PANIER DANS LE LOCALSTORAGE SUR LE NAVIGATEUR
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
           return{...state, cart: {...state.cart, cartItems }};
 case 'CART_REMOVE_ITEM':{
    const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
    );
 //   STOKER DES PRODUITSDU PANIER DANS LE LOCALSTORAGE SUR LE NAVIGATEUR
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    return{...state,cart: {...state.cat, cartItems}};
 }
            default:
                return state;
    }
}
export function StoreProvider(props) {
    const [state, dispatch] =useReducer(reducer, initialState);
    const value = {state,dispatch};
    return <Store.Provider value = {value}> {props.children} </Store.Provider>
}