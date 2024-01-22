import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User,UserLogin,UserRegister } from '../interfaces/User'
import initialInstance from '../utils/api'
import { AddConfigObj } from '../utils/configobjs'
import { allUsers, updateProfileType, userInfo,updatePasswordType, updateUserType, getAllUsersType, deleteUserType } from '../@types/users'
import axios from 'axios'


type InitialState = {
  isLoading: boolean
  loadingProfileUpdate:boolean
  loadingPasswordUpdate:boolean
  isError:boolean
  isSuccess:boolean
  errorMsg:string
  successMsg:string
  userInfo:userInfo | null,
  allUsers:allUsers | null
}
const initialState: InitialState = {
  isLoading: false,
  loadingProfileUpdate:false,
  loadingPasswordUpdate:false,
  isError:false,
  isSuccess:false,
  errorMsg:"",
  successMsg:"",
  userInfo:{} as userInfo,
  allUsers:{} as allUsers
}


export const register = createAsyncThunk(
  'user/register',
  async (data:UserRegister,{rejectWithValue,fulfillWithValue}) =>{
    const config = {
      headers: {
          "Content-Type": "multipart/form-data"
      }
  }
    try {
      if(data.avatar){
        const avatar= await axios.post('https://api.cloudinary.com/v1_1/dibuevfps/image/upload',data.avatar,config)
        const res = await initialInstance.post('users/register',{...data,avatar:avatar.data.url})
        return fulfillWithValue(res.data)
      }else{
        const res = await initialInstance.post('users/register',data)
        return fulfillWithValue(res.data)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (data:UserLogin,{rejectWithValue,fulfillWithValue}) =>{
  
    try {
      const res = await initialInstance.post('users/login',data)
        return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({data,token}:updateProfileType,{rejectWithValue,fulfillWithValue}) =>{
    const config = {
      headers: {
          "Content-Type": "multipart/form-data"
      }
  }
    try {
      if(data.avatar){
        const avatar= await axios.post('https://api.cloudinary.com/v1_1/dibuevfps/image/upload',data.avatar,config)
        const res = await initialInstance.put('users/update/profile',{...data,avatar:avatar.data.url},AddConfigObj(token))
        return fulfillWithValue(res.data)
      }else{
        const res = await initialInstance.put('users/update/profile',data,AddConfigObj(token))
        return fulfillWithValue(res.data)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async ({token,data}:updatePasswordType,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.put(`/users/update/password`,data,AddConfigObj(token))
          return fulfillWithValue(res.data)
      } catch (error) {
          return rejectWithValue(error)
      }
  }
)

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({token,data,userId}:updateUserType,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.put(`/users/${userId}`,data,AddConfigObj(token))
          return fulfillWithValue(res.data)
      } catch (error) {
          return rejectWithValue(error)
      }
  }
)

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async ({token,currentPage}:getAllUsersType,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.get(`/users/?pageNumber=${currentPage}`,AddConfigObj(token))
          return fulfillWithValue(res.data)
      } catch (error) {
          return rejectWithValue(error)
      }
  }
)

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({token,id}:deleteUserType,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.delete(`/users/${id}`,AddConfigObj(token))
          return fulfillWithValue(res.data)
      } catch (error) {
          return rejectWithValue(error)
      }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout:((state)=>{
      state.userInfo=null
      state.isLoading=false;
      state.isError=false;
      state.isSuccess=false;
      state.errorMsg="";
      state.successMsg="";
      state.allUsers=null
    }),
    clearUserState:((state)=>{
      state.isLoading=false;
      state.isError=false;
      state.isSuccess=false;
      state.errorMsg="";
      state.successMsg=""
    }),
  },
  extraReducers: builder => {

    //register actions
    builder.addCase(register.pending, state => {
      state.isLoading = true
    })
    builder.addCase(register.fulfilled,(state, action: PayloadAction<userInfo>) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = {...action.payload}
      }
    )
    builder.addCase(register.rejected, (state,action:PayloadAction<any>) => {
      state.isLoading = false
      state.isError=true
      state.errorMsg=`${action.payload.response.data.message}`
    })

    //login actions
    builder.addCase(login.pending, state => {
      state.isLoading = true
    })
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<userInfo>) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = {...action.payload}
      }
    )
    builder.addCase(login.rejected, (state,action:PayloadAction<any>) => {
      state.isLoading = false
      state.isError=true
      state.errorMsg=`${action.payload.response.data.message}`
    })

    //update user profile actions
    builder.addCase(updateProfile.pending, (state) => {
      state.loadingProfileUpdate=true
    })
    builder.addCase(updateProfile.fulfilled, (state,action) => {
      state.isSuccess=true
      state.loadingProfileUpdate=false
      state.successMsg='Profile Has Been Updated Successfully'
      state.userInfo={...action.payload}
    })
    builder.addCase(updateProfile.rejected, (state,action:any) => {
      state.isError=true
      state.loadingProfileUpdate=false
      state.errorMsg=`${action.payload.response.data.message}`
    })

    //update user password actions
    builder.addCase(updatePassword.pending, (state) => {
      state.loadingPasswordUpdate=true
    })
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.isSuccess=true
      state.loadingPasswordUpdate=false
      state.successMsg='Password Has Been Updated Successfully'
    })
    builder.addCase(updatePassword.rejected, (state,action:any) => {
      state.isError=true
      state.loadingPasswordUpdate=false
      state.errorMsg=`${action.payload.response.data.message}`
    })

    //update user by Admin actions
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isSuccess=true
      state.successMsg='User Has Been Updated Successfully'
    })
    builder.addCase(updateUser.rejected, (state,action:any) => {
      state.isError=true
      state.errorMsg=`${action.payload.response.data.message}`
    })

    //get all users actions
    builder.addCase(getAllUsers.fulfilled, (state,action) => {
      state.allUsers={...action.payload}
    })

    // delete single user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading=true
    })
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.isSuccess=true
      state.isLoading=false
      state.successMsg='User Has Been Deleted Successfully'
    })
    builder.addCase(deleteUser.rejected, (state) => {
      state.isLoading=false
    })
  }
})

export default userSlice.reducer
export const { logout, clearUserState } = userSlice.actions
