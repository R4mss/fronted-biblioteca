import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
    name: 'general',
    initialState: {
        general: null,
        loading: false,
    },
    reducers: {
        setGeneral:(state,action)=>{
            state.general=action.payload;
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        }

    }
});
export const { setGeneral,setLoading } = generalSlice.actions;
export default generalSlice.reducer;