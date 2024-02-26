import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import Auth from '../model/types/auth.model';

const initialState: Auth = {
    cargando: true,
    codigo: "",
    token: null,
    autenticado: false,
    tipoUsuario: ""
} 

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        starting: (state) => {
            window.localStorage.clear();
            state.cargando = false;
            state.codigo = "";
            state.token = null;
            state.autenticado = false;
            state.tipoUsuario = ""
        },
        restore: (state, action: PayloadAction<{ codigo: string, token: string, authentication: boolean }>) => {
            state.cargando = false;
            state.codigo = action.payload.codigo
            state.token = action.payload.token;
            state.autenticado = action.payload.authentication;
            // state.tipoUsuario = action.payload.tipoUsuario;
        },
        login: (state, action: PayloadAction<{ codigo: string, token: string, tipoUsuario: string }>) => {
            state.autenticado = true;
            state.codigo = action.payload.codigo
            state.token = action.payload.token;
            state.tipoUsuario = action.payload.tipoUsuario;
            window.localStorage.setItem("codigo", JSON.stringify(action.payload.codigo));
            window.localStorage.setItem("token", JSON.stringify(action.payload.token));
            window.localStorage.setItem("tipoUsuario", JSON.stringify(action.payload.tipoUsuario));
        },
        logout: (state) => {          
            state.cargando = true;
            state.codigo = "";
            state.token = null;
            state.autenticado = false;
            state.tipoUsuario = "";
            window.localStorage.clear();
        },
    },
})

export const { starting, login, logout, restore } = authSlice.actions

export default authSlice.reducer