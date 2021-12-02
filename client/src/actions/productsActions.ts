import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../constants/productConstants";
import axios from 'axios'
import { AppDispatch } from "../store";
export const listProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get('/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const listProductDetails = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const deleteProduct = (id: string) => async (dispatch: AppDispatch, getState: any) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}