import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import CartItemModel from "../models/CartItemModel";

interface CartAction {
    type: string;
    payload: CartItemModel;
    error?: String;
}

export const cartReducer = (state = { cartItems: [] }, action: CartAction) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = state.cartItems.find((x: CartItemModel) => x.product === item.product)
            if (existItem) {
                return {
                    ...state, cartItems: state.cartItems.map((x: CartItemModel) => x.product === existItem.product ? item : x)
                }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        default:
            return state;
    }
}