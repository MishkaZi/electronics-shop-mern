import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import CartItemModel from "../models/CartItemModel";

interface CartAction {
    type: string;
    payload: any;
    error?: String;
}
// , itemsPrice: 0, taxPrice: 0, shippingPrice: 0, totalPrice: 0 
export const cartReducer = (state = { cartItems: [], paymentMethod: '', shippingAddress: {} }, action: CartAction) => {
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

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state;
    }
}