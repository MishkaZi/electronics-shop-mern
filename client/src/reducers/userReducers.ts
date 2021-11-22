import { USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL } from "../constants/userConstants";
import UserInfoModel from "../models/UserInfoModel";

interface UserLoginAction {
    type: string;
    payload: UserInfoModel;
    error?: String;
}



export const userLoginReducer = (state: any = { userInfo: {}, loading: false, error: '' },

    action: UserLoginAction) => {

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

interface UserRegisterAction {
    type: string;
    payload: UserInfoModel;
    error?: String;
}

export const userRegisterReducer = (state = { userInfo: {}, loading: false, error: '' },

    action: UserRegisterAction) => {

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