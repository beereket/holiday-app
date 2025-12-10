import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { login, loginSuccess, loginFailure } from './auth.actions';

export const authReducer = createReducer(
    initialAuthState,

    on(login, state => ({
        ...state,
        loading: true,
        error: null
    })),

    on(loginSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        user: user
    })),

    on(loginFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error: error
    })),
)