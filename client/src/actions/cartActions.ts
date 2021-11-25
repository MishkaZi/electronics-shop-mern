import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import axios from 'axios'
import { AppDispatch } from "../store";
import ShippingModel from "../models/ShippingModel";

export const addToCart = (id: string, qty: number) => async (dispatch: AppDispatch, getState: any) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id: string) => async (dispatch: AppDispatch, getState: any) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingData: ShippingModel) => async (dispatch: AppDispatch, getState: any) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: shippingData
    })

    localStorage.setItem('shippingAddress', JSON.stringify(shippingData))
}

export const savePaymentMethod = (paymentData: String) => async (dispatch: AppDispatch, getState: any) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: paymentData
    })

    localStorage.setItem('paymentMethod', JSON.stringify(paymentData))
}