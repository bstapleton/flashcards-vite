import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        value: !!localStorage.getItem('token'),
        isTrial: !!localStorage.getItem('is_trial_user')
    },
    reducers: {
        login: state => {
            state.value = true
            state.isTrial = true
        },
        logout: state => {
            state.value = false
            state.isTrial = false
        }
    }
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;