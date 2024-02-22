import {createSlice} from '@reduxjs/toolkit'

const initialState = { 
    login: {}, 
    register: {},
    password: {},
    newPassword: {}
}

const successAlert = (value) => {
    return {
        title: 'Success',
        severity: 'success',
        value
    }
}

const errorAlert = (value) => {
    return {
        title: 'Error',
        severity: 'error',
        value
    }
}

const AlertSlice = createSlice({
    name: 'Alert',
    initialState,
    reducers: {
        setSuccessLogin(state, {payload}) {
            return {...state, login: successAlert(payload)}
        },

        setSuccessRegister(state, {payload}) {
            return {...state, register: successAlert(payload)}
        },

        setSuccessPassword(state, {payload}) {
            return {...state, password: successAlert(payload)}
        },

        setSuccessNewPassword(state, {payload}) {
            return {...state, newPassword: successAlert(payload)}
        },

        setErrorLogin(state, {payload}) {
            return {...state, login: errorAlert(payload)}
        },

        setErrorRegister(state, {payload}) {
            return {...state, register: errorAlert(payload)}
        },

        setErrorPassword(state, {payload}) {
            return {...state, password: errorAlert(payload)}
        },

        setErrorNewPassword(state, {payload}) {
            return {...state, newPassword: errorAlert(payload)}
        },

        clearRegister(state) {
            state.register.value = ''
            return state;
        },

        clearLogin(state) {
            state.login.value = ''
            return state;
        },

        clearPassword(state) {
            state.password.value = ''
            return state;
        },

        clearNewPassword(state) {
            state.newPassword.value = ''
            return state;
        }
    }
})

export const AlertActions = AlertSlice.actions
export const AlertReducer = AlertSlice.reducer