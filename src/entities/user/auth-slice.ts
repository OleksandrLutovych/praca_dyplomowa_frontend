import {User} from "./types.ts";
import {createSlice} from "@reduxjs/toolkit";

interface AuthState {
    isLoading: boolean
    isAuth: boolean
    user: User | null
}

const initialState: AuthState = {
    isLoading: false,
    isAuth: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setAuth: (state, action) => {
        // },
        // setUser: (state, action) => {},
    }
})

export const {} = authSlice.actions;
export default authSlice.reducer;