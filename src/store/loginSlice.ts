import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        value: !!localStorage.getItem('token'),
        isTrial: localStorage.getItem('is_trial_user') === 'true'
    },
    reducers: {
        login: state => {
            state.value = true
            state.isTrial = localStorage.getItem('is_trial_user') === 'true'
        },
        logout: state => {
            state.value = false
            state.isTrial = false
        }
    }
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;