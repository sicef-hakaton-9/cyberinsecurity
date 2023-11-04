import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { LoginUserFailure, LoginUserSuccess, RegisterUserFailure, RegisterUserSuccess } from "./user.actions";

export const userReducer = createReducer(
    initialUserState,
    on(LoginUserSuccess, (state, {token}) => ({
        ...state,
        token: token.access_token,
    })),
    on(LoginUserFailure, (state, {error}) => ({
        ...state,
        error,
    })),
    on(RegisterUserSuccess, (state, {token}) => ({
        ...state,
        token: token.access_token,
    })),
    on(RegisterUserFailure, (state, {error}) => ({
        ...state,
        error,
    }))
)