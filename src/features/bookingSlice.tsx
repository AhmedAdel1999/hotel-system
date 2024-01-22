import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import initialInstance from '../utils/api'
import { AddConfigObj } from '../utils/configobjs'
import { CheckBookingType, allBookingsType, deleteBookingType, getAllBookingType, newBookingType } from '../@types/bookings'


type InitialState = {
  isLoading: boolean
  isError:boolean
  isSuccess:boolean
  errorMsg:string
  successMsg:string
  roomAvailable:boolean
  allBookings:allBookingsType
}



const initialState: InitialState = {
  isLoading: false,
  isError:false,
  isSuccess:false,
  errorMsg:"",
  successMsg:"",
  roomAvailable:false,
  allBookings:{} as allBookingsType
}




export const CheckBookingAvaliable = createAsyncThunk(
  'booking/check',
  async (data:CheckBookingType,{rejectWithValue,fulfillWithValue}) =>{
    try {
        const res = await initialInstance.post('bookings/check',{...data})
        return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const NewBooking = createAsyncThunk(
  'booking/NewBooking',
  async ({data,token}:newBookingType,{rejectWithValue,fulfillWithValue}) =>{
    try {
        const res = await initialInstance.post('bookings',{...data},AddConfigObj(token))
        return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteBooking = createAsyncThunk(
  'booking/deleteBooking',
  async ({token,id}:deleteBookingType,{rejectWithValue,fulfillWithValue}) =>{
    try {
        const res = await initialInstance.delete(`bookings/${id}`,AddConfigObj(token))
        return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getAllBookings = createAsyncThunk(
  'booking/getAllBookings',
  async ({token,currentPage}:getAllBookingType,{rejectWithValue,fulfillWithValue}) =>{
    try {
        const res = await initialInstance.get(`bookings/?pageNumber=${currentPage}`,AddConfigObj(token))
        return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getMyBookings = createAsyncThunk(
  'booking/getMyBookings',
  async ({token}:{token:string},{rejectWithValue,fulfillWithValue}) =>{
    try {
        const res = await initialInstance.get(`bookings/me`,AddConfigObj(token))
        return fulfillWithValue(res.data)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)


const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBookingState:((state)=>{
      state.isError=false;
      state.isSuccess=false;
      state.errorMsg="";
      state.successMsg=""
  })
  },
  extraReducers: builder => {

    //check booking actions
    builder.addCase(CheckBookingAvaliable.fulfilled,(state, action) => {
        state.roomAvailable = action.payload.roomAvailable
        state.isLoading=true
      }
    )

    //new booking actions
    builder.addCase(NewBooking.fulfilled,(state) => {
        state.isSuccess=true
        state.successMsg='You Have Booking Successfully'
      }
    )
    builder.addCase(NewBooking.rejected,(state) => {
        state.isError=true
        state.errorMsg='Your Booking Failed '
      }
    )

    //get all bookings
    builder.addCase(getAllBookings.fulfilled,(state,action) => {
        state.allBookings={...action.payload}
      }
    )

    //get my bookings
    builder.addCase(getMyBookings.fulfilled,(state,action) => {
      state.allBookings={
        bookings:[...action.payload],
        pages:0,
        page:0,
        count:action.payload.length
      }
    }
  )

   //delete booking
    builder.addCase(deleteBooking.pending,(state) => {
        state.isLoading=true
    })
    builder.addCase(deleteBooking.fulfilled,(state) => {
        state.successMsg='Booking Has Successfully Deleted.'
        state.isSuccess=true
        state.isLoading=false
    })
    builder.addCase(deleteBooking.rejected,(state) => {
      state.isLoading=false
  })
  }
})
export const { clearBookingState } = bookingSlice.actions
export default bookingSlice.reducer
