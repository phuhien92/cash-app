import axios from "axios";
import { omit } from "lodash/fp";
import { interpret, Machine, assign, State } from "xstate";
import { history } from "../utils/historyUtils";
import { User } from '../models';
import { httpClient } from "../utils/asyncUtils";

const env = process.env;

export interface AuthMachineSchema {
    states: {
        unauthorized: {};
        signup: {};
        loading: {};
        updating: {};
        logout: {};
        refreshing: {};
        authorized: {};
    }
}

export type AuthMachineEvents = 
    | { type: "LOGIN"}
    | { type: "LOGOUT"}
    | { type: "UPDATE"}
    | { type: "REFRESH"}
    | { type: "SIGNUP"};

export interface AuthMachineContext {
    user?: User;
    message?: string;
}

export const authMachine = Machine<AuthMachineContext, AuthMachineSchema, AuthMachineEvents>(
    {
        id: "authentication",
        initial: "unauthorized",
        context: {
            user: undefined,
            message: undefined
        },
        states: {
            unauthorized: {
                entry: "resetUser",
                on: {
                    LOGIN: "loading",
                    SIGNUP: "signup"
                }
            },
            signup: {
                invoke: {
                    src: "performSignup",
                    onDone: { target: "unauthorized", actions: "onSuccess" },
                    onError: { target: "unauthorized", actions: "onError" }
                }
            },
            loading: {
                invoke: {
                    src: "performLogin",
                    onDone: { target: "authorized", actions: "onSuccess" },
                    onError: { target: "unauthorized", actions: "onError" }
                }
            },
            updating: {
                invoke: {
                    src: "getUserProfile",
                    onDone: { target: "authorized", actions: "setUserProfile" },
                    onError: { target: "unauthorized", actions: "onError" } 
                }
            },
            refreshing: {
                invoke: {
                    src: "getUserProfile",
                    onDone: {
                        target: "authorized",
                        actions: "setUserProfile"
                    },
                    onError: {
                        target: "unauthorized",
                        actions: "onError"
                    }
                },
                on: {
                    LOGOUT: "logout" 
                }
            },
            logout: {
                invoke: {
                    src: "performLogout",
                    onDone: {
                    target: "unauthorized"
                    },
                    onError: {
                    target: "unauthorized",
                    actions: "onError"
                    }
                }
            },
            authorized: {
                entry: "redirectHomeAfterLogin",
                on: {
                    UPDATE: "updating",
                    REFRESH: "refreshing",
                    LOGOUT: "logout"
                }
            }
        },
    },
    {
        services: {
            getUserProfile: async (ctx,event) => {
                const resp = await httpClient.get(`//${env.REACT_APP_APIHOST}/checkAuth`);
                return resp.data;
            },
            performLogout: async (ctx,event) => {
                localStorage.removeItem('authState');
                return await httpClient.post(`//${env.REACT_APP_APIHOST}/logout`);
            },
            performSignup: async (ctx, event) => {
                const payload = omit("type", event);
                const resp = await httpClient.post(`//${env.REACT_APP_APIHOST}/users`, payload);
                history.push("/signin");
                return resp.data;
            },
            performLogin: async (ctx,event) => {
                return await httpClient
                        .post(`//${env.REACT_APP_APIHOST}/login`,event)
                        .then(({data}) => {
                            history.push("/")
                            return data;
                        })
                        .catch((error) => {
                            throw new Error("username or password is invalid.");
                        })
            }
        },
        actions: {
            redirectHomeAfterLogin: async(ctx,event) => {
                if (history.location.pathname === '/signin') {
                    window.location.pathname = '/';
                }
            },
            setUserProfile: assign((ctx: any, event: any) => {
                console.log("event:", event)
                return {
                    user: event.data.user
                }
            }),
            resetUser: assign((ctx:any,event:any) => {
                return { user: undefined }
            }),
            onSuccess: assign((ctx: any, event: any) => {
                return {
                    user: event.data.user,
                    message: undefined
                }
            }),
            onError: assign((ctx: any, event: any) => {
                return {
                    message: event.data.message
                }
            })
        }
    }
);

// @ts-ignore
const stateDefinition = JSON.parse(localStorage.getItem("authState")) || null;

let resolveState;

if (stateDefinition) {
    const previousState = State.create(stateDefinition);
    // @ts-ignore
    resolveState = authMachine.resolveState(previousState);
}
export const authService = interpret(authMachine, {devTools: true})
    .onTransition((state) => {
        if (state.changed) {
            localStorage.setItem("authState", JSON.stringify(state))
        }
    })
    .start(resolveState)