import { createSlice } from "@reduxjs/toolkit";

 const videocallSlice=createSlice({
    name:'videocall',
    initialState:{
        videocalldata:''
        
    },
    reducers:{
        setVideocalldata:(state,action)=>{
            state.videocalldata=action.payload
        }

    }
})

export const{setVideocalldata}=videocallSlice.actions
export default videocallSlice.reducer
