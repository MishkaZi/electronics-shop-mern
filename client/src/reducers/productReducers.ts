import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET
} from "../constants/productConstants";

import ProductModel from "../models/ProductModel";

interface ProductListAction {
    type: string;
    payload: {
        products: ProductModel[],
        pages: number,
        page: number
    }
    error?: String;
}

export const productListReducer = (state = { products: [], loading: false, error: '', page: 0, pages: 0 }, action: ProductListAction) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            }
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


export const productDetailsReducer = (state = { product: { reviews: [] }, loading: false, error: '' }, action: ProductDetailsAction) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload, product: { reviews: [] } }
        default:
            return state;
    }
}

export const productDeleteReducer = (state = { success: false, loading: false, error: '' }, action: ProductDetailsAction) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const productCreateReducer = (state = { product: {}, success: false, loading: false, error: '' }, action: ProductDetailsAction) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const productUpdateReducer = (state = { product: {}, success: false, loading: false, error: '' }, action: ProductDetailsAction) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true, product: {} }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state;
    }
}


export const productCreateReviewReducer = (state = { success: false, loading: false, error: '' }, action: ProductDetailsAction) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return { product: {} }
        default:
            return state;
    }
}