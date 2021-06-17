import { SignInPayload, SignupPayload, User } from './../models/user';
import {createState, useState, DevTools } from '@hookstate/core'
import { httpClient } from '../utils/asyncUtils';
import { history } from "../utils/historyUtils";

export interface AuthMachineContext {
    isAuthorized: boolean;
    user?: User;
    message?: string;
}

export type AuthEvents = 
| { type: "LOGIN" }
| { type: "LOGOUT" }
| { type: "UPDATE" }
| { type: "REFRESH" }
| { type: "SIGNUP" };

// @ts-ignore
const stateDefinition = JSON.parse(localStorage.getItem("authState"));
const initialStateDefinition = {
    isAuthorized: false,
    user: undefined,
    message: undefined
};
const state = createState(stateDefinition ? stateDefinition : initialStateDefinition);
DevTools(state)
.label('AuthState')

const onError = (data: any) => {
    state.merge({
        message: data.message
    })
}

const onSuccess = (data: any) => {
    state.merge({
        isAuthorized: true,
        user: data.user,
    });
    localStorage.setItem("authState", JSON.stringify(state.get()));
}

const performLogin = async(payload: SignInPayload) => {
    return await httpClient
        .post(`http://localhost:8889/login`, payload)
        .then(({data}) => {

            onSuccess(data);

            history.push('/');

            return data;
        })
        .catch(err => {
            onError(err);
        })
}

const performSignup = async(payload: SignupPayload) => {
    return await httpClient
        .post('http://localhost:8889/signup', payload)
        .then(({data}) => {
            history.push('/');
            return data;
        })
        .catch(err => {
            throw new Error('')
        })
}

const getUserProfile = async() => {
    const {data} = await httpClient.get('http://localhost:8889/checkAuth');
    return data;
}

const performLogout = async () => {
    localStorage.removeItem("authState");

    state.set(initialStateDefinition);

    history.push('/signin');

    return await httpClient.post(`http://localhost:8889/logout`);
}

const useAuthState = () => {
    const globalState = useState(state);

    return {
        performLogin,
        performSignup,
        getUserProfile,
        performLogout,
        authState: globalState.value
    }
}

export default useAuthState;