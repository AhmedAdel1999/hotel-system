import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Room } from '../interfaces/Room'
import initialInstance from '../utils/api'
import UploadImg from '../utils/uploadimg'

type AddNewRoomType = {
    data:Omit<Room,"id"|"userId">,
    userId:string | undefined
}

type updateRoomType = {
    data:Room,
    userId:string | undefined,
    roomId:string | undefined
}

type deleteRoomType = {
    roomId:string | undefined,
    userId:string | undefined,
}

type InitialState = {
  isLoading: boolean
  isDeletingRoom:boolean
  isSuccessDeleting:boolean
  isError:boolean
  isSuccess:boolean
  errorMsg:string
  successMsg:string
  allRooms:Room[]
}

const initialState: InitialState = {
  isLoading: false,
  isDeletingRoom:false,
  isSuccessDeleting:false,
  isError:false,
  isSuccess:false,
  errorMsg:"",
  successMsg:"",
  allRooms:[] as Room[],
}


export const getAllRooms = createAsyncThunk(
    "room/getallrooms",
    async (undefined,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.get(`rooms`)
            return fulfillWithValue(res.data)
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getSingleRoom = createAsyncThunk(
    "room/getSingleRoom",
    async (id:string,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.get(`rooms/${id}`)
            return fulfillWithValue(res.data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const AddNewRoom = createAsyncThunk(
    "room/AddNewRoom",
    async ({data,userId}:AddNewRoomType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const roomImg= await UploadImg(data.image)
            const res = await initialInstance.post(`users/${userId}/rooms/`,{...data,image:roomImg})
            return fulfillWithValue(res.data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateRoom = createAsyncThunk(
    "room/updateRoom",
    async ({data,roomId,userId}:updateRoomType,{rejectWithValue,fulfillWithValue}) => {
        try {
            if(typeof(data.image)==="string"){
                const res = await initialInstance.put(`users/${userId}/rooms/${roomId}`,data)
                return fulfillWithValue(res.data)
            }else{
                const roomImg = await UploadImg(data.image)
                const res = await initialInstance.put(`users/${userId}/rooms/${roomId}`,{...data,image:roomImg})
                return fulfillWithValue(res.data)
            }
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteRoom = createAsyncThunk(
    "room/deleteRoom",
    async ({roomId,userId}:deleteRoomType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.delete(`users/${userId}/rooms/${roomId}`)
            return fulfillWithValue(res.data)
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)

export const AddRoomReview = createAsyncThunk(
    "room/AddRoomReview",

    async ({data,roomId,userId}:updateRoomType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.put(`users/${userId}/rooms/${roomId}`,{...data})
            return fulfillWithValue(res.data)
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        clearRoomState:((state)=>{
            state.isDeletingRoom=false;
            state.isSuccessDeleting=false;
            state.isError=false;
            state.isSuccess=false;
            state.errorMsg="";
            state.successMsg=""
        })
    },
extraReducers: builder => {

    //get all rooms
    builder.addCase(getAllRooms.pending,(state)=>{
        state.isLoading=true
    });
    builder.addCase(getAllRooms.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.allRooms=[...action.payload]
    });
    builder.addCase(getAllRooms.rejected,(state,action)=>{
        state.isLoading=false
        state.errorMsg=`${action.payload}`
    });

    //get single room
    builder.addCase(getSingleRoom.fulfilled,(state,action)=>{
        let currentRoom = {...action.payload}
        let roomIndex = state.allRooms.findIndex((el)=>el.id===currentRoom.id)
        state.allRooms.splice(roomIndex,1,{...currentRoom})
    });

    //Add New Room Actions
    builder.addCase(AddNewRoom.pending,(state)=>{
        state.isLoading=true
    });
    builder.addCase(AddNewRoom.fulfilled,(state)=>{
        state.isLoading=false
        state.isSuccess=true
        state.successMsg='Room Has Been Successfully Added'
    });

    //update Room Actions
    builder.addCase(updateRoom.pending,(state)=>{
        state.isLoading=true
    });
    builder.addCase(updateRoom.fulfilled,(state)=>{
        state.isLoading=false
        state.isSuccess=true
        state.successMsg='Room Has Been Successfully Updated'
    });

    //delete single room
    builder.addCase(deleteRoom.pending,(state)=>{
        state.isDeletingRoom=true
    });
    builder.addCase(deleteRoom.fulfilled,(state)=>{
        state.isSuccessDeleting=true
        state.isDeletingRoom=false
        state.successMsg='Room Has Been Successfully Deleted'
    });
    builder.addCase(deleteRoom.rejected,(state)=>{
        state.isDeletingRoom=false
    });

    // add reviews actions
    builder.addCase(AddRoomReview.pending,(state)=>{
        state.isLoading=true
    });
    builder.addCase(AddRoomReview.fulfilled,(state)=>{
        state.isLoading=false
        state.isSuccess=true
        state.successMsg=`You Have Successfully Add An Review`
    });
    builder.addCase(AddRoomReview.rejected,(state)=>{
        state.isLoading=false
        state.isError=true
        state.errorMsg=`You Faild To Add An Review`
    });

   }
})
export const { clearRoomState } = roomSlice.actions
export default roomSlice.reducer
