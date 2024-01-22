import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Reviews, Room } from '../interfaces/Room'
import initialInstance from '../utils/api'
import { AddConfigObj } from '../utils/configobjs'
import { AddNewRoomType, addRoomReviewType, allRoomsType, deleteRoomType, getAllRoomsType, updateRoomType } from '../@types/rooms'


type InitialState = {
  isLoading: boolean
  isError:boolean
  isSuccess:boolean
  errorMsg:string
  successMsg:string
  allRooms:allRoomsType
}

const initialState: InitialState = {
  isLoading: false,
  isError:false,
  isSuccess:false,
  errorMsg:"",
  successMsg:"",
  allRooms:{} as allRoomsType,
}


export const getAllRooms = createAsyncThunk(
    "room/getallrooms",
    async ({currentPage,numOfBeds,roomType,search}:getAllRoomsType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.get(`rooms/?keyword=${search}&numOfBeds=${numOfBeds}&roomType=${roomType}&pageNumber=${currentPage}`)
            return fulfillWithValue(res.data)
        } catch (error) {
            return rejectWithValue(error)
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
    async ({data,token}:AddNewRoomType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.post(`rooms/`,data,AddConfigObj(token))
            return fulfillWithValue(res.data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateRoom = createAsyncThunk(
    "room/updateRoom",
    async ({data,token,roomId}:updateRoomType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.put(`rooms/${roomId}`,data,AddConfigObj(token))
            return fulfillWithValue(res.data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteRoom = createAsyncThunk(
    "room/deleteRoom",
    async ({id,token}:deleteRoomType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.delete(`rooms/${id}`,AddConfigObj(token))
            return fulfillWithValue(res.data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const AddRoomReview = createAsyncThunk(
    "room/AddRoomReview",

    async ({data,token,roomId}:addRoomReviewType,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.post(`rooms/${roomId}/reviews`,{...data},AddConfigObj(token))
            return fulfillWithValue(res.data)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        clearRoomState:((state)=>{
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
        state.allRooms={...action.payload}
    });
    builder.addCase(getAllRooms.rejected,(state,action)=>{
        state.isLoading=false
        state.errorMsg=`${action.payload}`
    });

    //get single room
    builder.addCase(getSingleRoom.fulfilled,(state,action)=>{
        let currentRoom = {...action.payload}
        let roomIndex = state.allRooms.rooms.findIndex((el)=>el._id===currentRoom._id)
        state.allRooms.rooms.splice(roomIndex,1,{...currentRoom})
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
        state.isLoading=true
    });
    builder.addCase(deleteRoom.fulfilled,(state)=>{
        state.isSuccess=true
        state.isLoading=false
        state.successMsg='Room Has Been Successfully Deleted'
    });
    builder.addCase(deleteRoom.rejected,(state)=>{
        state.isLoading=false
    });

    // add reviews actions
    builder.addCase(AddRoomReview.pending,(state)=>{
        state.isLoading=true
    });
    builder.addCase(AddRoomReview.fulfilled,(state,action:any)=>{
        state.isLoading=false
        state.isSuccess=true
        state.successMsg=`${action.payload.message}`
    });
    builder.addCase(AddRoomReview.rejected,(state,action:any)=>{
        state.isLoading=false
        state.isError=true
        state.errorMsg=`You Have ${action.payload.response.data.message}`
    });

   }
})
export const { clearRoomState } = roomSlice.actions
export default roomSlice.reducer
