import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

import ProductModel from "../models/ProductModel";

interface ProductListAction {
    type: string;
    payload: ProductModel[];
    error?: String;
}

export const productListReducer = (state = { products: [], loading: false, error: '' }, action: ProductListAction) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

interface ProductDetailsAction {
    type: string;
    payload: ProductModel | any;
    error?: String;
}


export const productDetailsReducer = (state = { product: {}, loading: false, error: '' }, action: ProductDetailsAction) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}