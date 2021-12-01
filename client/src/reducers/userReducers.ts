

import { USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_UPDATE_PROFILE__REQUEST, USER_UPDATE_PROFILE__SUCCESS, USER_UPDATE_PROFILE__FAIL, USER_UPDATE_PROFILE__RESET, USER_DETAILS_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from "../constants/userConstants";
import UserInfoModel from "../models/UserInfoModel";

interface UsersAction {
    type: string;
    payload: UserInfoModel | {};
    error?: String;
}



export const userLoginReducer = (state: any = { userInfo: {}, loading: false, error: '' },

    action: UsersAction) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userRegisterReducer = (state = { userInfo: {}, loading: false, error: '' },

    action: UsersAction) => {

    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userDetailsReducer = (state = { userInfo: {}, loading: false, error: '' },

    action: UsersAction) => {

    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        case USER_DETAILS_RESET:
            return { userInfo: {} }
        default:
            return state;
    }
}


export const userUpdateReducer = (state = { userInfo: {}, success: false, loading: false, error: '' },

    action: UsersAction) => {

    switch (action.type) {
        case USER_UPDATE_PROFILE__REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE__SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE__FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_PROFILE__RESET:
            return {}
        default:
            return state;
    }
}

//Admin
export const userListReducer = (state = { users: [], loading: false, error: '' },
    action: UsersAction) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state;
    }
}

export const userDeleteReducer = (state = { message: '', loading: false, error: '', success: false },
    action: UsersAction) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}