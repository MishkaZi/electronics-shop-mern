import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from "../constants/orderConstants"
import OrderModel from "../models/OrderModel"

interface OrderAction {
    type: string;
    payload: OrderModel;
    error?: String;
}



export const orderCreareReducer = (state = { order: {}, loading: false, error: '', success: false },

    action: OrderAction) => {

    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
