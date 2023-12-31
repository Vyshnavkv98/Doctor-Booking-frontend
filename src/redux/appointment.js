import { createSlice } from "@reduxjs/toolkit";

 const appointmentSlice=createSlice({
    name:'appointmentData',
    initialState:{
        appointment:''  
    },
    reducers:{
        appointments:(state,action)=>{
            state.appointment=action.payload
        }

    }
})

export const{appointments}=appointmentSlice.actions
export default appointmentSlice.reducer
