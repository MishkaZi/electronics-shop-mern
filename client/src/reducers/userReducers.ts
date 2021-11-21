import { USER_LOGIN_FAIL, USER_LOGOUT, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstants";
import UserInfoModel from "../models/UserInfoModel";

interface UserLoginAction {
    type: string;
    payload: UserInfoModel;
    error?: String;
}

export const userLoginReducer = (state = { userInfo: {}, loading: false, error: '' },
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