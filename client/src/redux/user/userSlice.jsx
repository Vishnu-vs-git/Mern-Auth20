import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  currentUser:null,
  loading:false,
  error:false
}
const userSlice= createSlice({
  name:'user',
  initialState,
  reducers:{
    signInstart:(state)=>{
      state.loading=true;
    },
    signInSuccess:(state,action)=>{
         state.currentUser=action.payload
         state.loading=false;
         state.error=false;
    },
    signInFailure:(state,action)=>{
         state.loading=false;
         state.error = action.payload;
    },
    imageUpdate:(state,action)=>{
      state.currentUser.profilePicture=action.payload
    },
    profileInfoUpdate:(state,action)=>{
      state.currentUser.username=action.payload.username;
      state.currentUser.email=action.payload.email
    },
    userLogout:(state,action)=>{
      state.currentUser=null;
    }
  }

})
export const {signInstart,signInSuccess,signInFailure,imageUpdate,profileInfoUpdate,userLogout}=userSlice.actions;
export default userSlice.reducer;
