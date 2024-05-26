import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User,UserLogin,UserRegister } from '../interfaces/User'
import initialInstance from '../utils/api'
import UploadImg from '../utils/uploadimg'

type updateUserType={
  data:User,
  userId:string | undefined,
}

type InitialState = {
  isLoading: boolean
  loadingProfileUpdate:boolean
  loadingPasswordUpdate:boolean
  isError:boolean
  isSuccess:boolean
  errorMsg:string
  successMsg:string
  userInfo:User | {},
  allUsers:User[] | []
}
const initialState: InitialState = {
  isLoading: false,
  loadingProfileUpdate:false,
  loadingPasswordUpdate:false,
  isError:false,
  isSuccess:false,
  errorMsg:"",
  successMsg:"",
  userInfo:{} as User,
  allUsers:[] as User[]
}

export const register =createAsyncThunk(
  "users/register",
  async(registerData:UserRegister,{ rejectWithValue,fulfillWithValue })=>{

    const {email} = registerData
    let isExist = false

    try{
      const response = await initialInstance.get("/users")
      const data = await response.data

      if(data.length>0){
          for(let i=0; i<data.length; i++){
            if(data[i].email===email){
              isExist = true
              return rejectWithValue("This User Is Already Registered");
            }
          }

          if(!isExist){
            let avatar=""
            if(registerData.avatar){
              avatar = await UploadImg(registerData.avatar)
            } 
            const response = await initialInstance.post("/users",{...registerData,avatar})
            const data = await response.data
            return fulfillWithValue(data)
          }
        
      }else{
        let avatar=""
        if(registerData.avatar){
          avatar = await UploadImg(registerData.avatar)
        } 
        const response = await initialInstance.post("/users",{...registerData,avatar})
        const data = await response.data
        return fulfillWithValue(data)
      }
    }catch(error:any){
        return rejectWithValue(error.message)
    }
  }
)


export const login =createAsyncThunk(
  "users/login",
  async(loginData:UserLogin,{ rejectWithValue,fulfillWithValue })=>{

    const{password,email}=loginData
    let isExist = false
    let userId:string

    try{

      const response = await initialInstance.get("/users")
      const data = await response.data

      if(data.length){
        for(let i=0; i<data.length; i++){
            if(data[i].email===email&&data[i].password===password){
                isExist=true
                 userId=data[i].id
                break;
            }
        }

        if(isExist){
          let currentUser = data.filter((user:User)=>user.id===userId)[0]
          return fulfillWithValue({...currentUser})
        }else{
          return rejectWithValue("user not found or password don,t match")
        }

      }else{
        return rejectWithValue("user not found")
      }

    }catch(error:any){
        return rejectWithValue(error.message)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({data,userId}:updateUserType,{rejectWithValue,fulfillWithValue}) =>{
   
    try {
      if(typeof(data.avatar)!=="string"){
        const avatar= await UploadImg(data.avatar)
        const res = await initialInstance.put(`users/${userId}`,{...data,avatar:avatar})
        return fulfillWithValue(res.data)
      }else{
        const res = await initialInstance.put(`users/${userId}`,data)
        return fulfillWithValue(res.data)
      }
    } catch (error:any) {
      return rejectWithValue(error.message)
    }
  }
)



export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({data,userId}:updateUserType,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.put(`/users/${userId}`,data)
          return fulfillWithValue(res.data)
      } catch (error:any) {
          return rejectWithValue(error.message)
      }
  }
)

export const AddNewBooking = createAsyncThunk(
  "user/AddNewBooking",
  async ({data,userId}:updateUserType,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.put(`/users/${userId}`,data)
          return fulfillWithValue(res.data)
      } catch (error:any) {
          return rejectWithValue(error.message)
      }
  }
)

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (undefined,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.get(`/users`)
          return fulfillWithValue(res.data)
      } catch (error:any) {
          return rejectWithValue(error.message)
      }
  }
)

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId:string,{rejectWithValue,fulfillWithValue}) => {
      try {
          const res = await initialInstance.delete(`/users/${userId}`)
          return fulfillWithValue(res.data)
      } catch (error:any) {
          return rejectWithValue(error.message)
      }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout:((state)=>{
      state.userInfo={}
      state.isLoading=false;
      state.isError=false;
      state.isSuccess=false;
      state.errorMsg="";
      state.successMsg="";
      state.allUsers=[]
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
    builder.addCase(register.fulfilled,(state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = {...action.payload}
      }
    )
    builder.addCase(register.rejected, (state,action:PayloadAction<any>) => {
      state.isLoading = false
      state.isError=true
      state.errorMsg=`${action.payload}`
    })

    //login actions
    builder.addCase(login.pending, state => {
      state.isLoading = true
    })
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInfo = {...action.payload}
      }
    )
    builder.addCase(login.rejected, (state,action:PayloadAction<any>) => {
      state.isLoading = false
      state.isError=true
      state.errorMsg=`${action.payload}`
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
      state.errorMsg=`${action.payload}`
    })

    //update user by Admin actions
    builder.addCase(updateUser.fulfilled, (state) => {
      state.isSuccess=true
      state.successMsg='User Has Been Updated Successfully'
    })
    builder.addCase(updateUser.rejected, (state,action:any) => {
      state.isError=true
      state.errorMsg=`${action.payload}`
    })

    //user add new booking
    builder.addCase(AddNewBooking.fulfilled, (state,action) => {
      state.isSuccess=true
      state.successMsg='You Have Booking Successfully'
      state.userInfo={...action.payload}
    })
    builder.addCase(AddNewBooking.rejected, (state) => {
      state.isError=true
      state.errorMsg='Your Booking Failed'
    })

    //get all users actions
    builder.addCase(getAllUsers.fulfilled, (state,action) => {
      state.allUsers=[...action.payload]
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
