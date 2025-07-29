import { createSlice } from '@reduxjs/toolkit';

// Load from localStorage or sessionStorage
const localAuth = localStorage.getItem('auth');
const sessionAuth = sessionStorage.getItem('auth');

const initialState = localAuth
    ? JSON.parse(localAuth)
    : sessionAuth
        ? JSON.parse(sessionAuth)
        : {
            token: null,
            user: null
        };


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthData: (state, action) => {
            const { token, user, remember } = action.payload;

            state.token = token;
            state.user = user;

            const authData = JSON.stringify({ token, user });

            if (remember) {
                localStorage.setItem('auth', authData);
            } else {
                sessionStorage.setItem('auth', authData);
            }
        },

        clearAuthData: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('auth');
            sessionStorage.removeItem('auth');
        }
    }
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
