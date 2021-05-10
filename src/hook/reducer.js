import jwt from "jwt-decode";

let user = localStorage.getItem('token')
    ? jwt(localStorage.getItem('token'))
    : '';
let token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : '';


export const initialState = {
    user: '' || user,
    token: '' || token,
    loading: false,
    errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
                ...initialState,
                loading: true,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...initialState,
                user: action.payload.token,
                token: action.payload.token,
                loading: false,
            };
        case 'LOGOUT':
            return {
                ...initialState,
                user: '',
                token: '',
            };

        case 'LOGIN_ERROR':
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error,
            };

        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};