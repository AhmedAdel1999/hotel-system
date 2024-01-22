import { useEffect, useState } from "react";
import {   Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MainPagination from "../components/pagination";
import moment from "moment";
import { getAllBookings, clearBookingState, deleteBooking, getMyBookings } from "../features/bookingSlice";
import TableShared from "../components/tableShared";
import Loader from "../components/loading/loader";

const AllBookings = ({ownbooking}:{ownbooking?:boolean}) =>{
    const[currentPage,setCurrentPage] = useState<number>(1)
    const[currentBookingId,setCurrentBookingId] = useState<string>("")
    const{allBookings,isSuccess,successMsg,isLoading} = useAppSelector((state)=>state.booking)
    const{userInfo} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()
    const { addToast:notify } = useToasts()

    useEffect(()=>{
        if(allBookings?.count>0){
            if(allBookings?.bookings.length==0){
                setCurrentPage(currentPage - 1)
            }
        }
    },[allBookings?.pages])
    
    useEffect(()=>{
        if(ownbooking){
            dispatch(getMyBookings({token:userInfo.token}))
        }else{
            dispatch(getAllBookings({token:userInfo.token,currentPage}))
        }
        
        if(isSuccess){
            notify(`${successMsg}`,{
                appearance: 'success',
                autoDismiss:true
            })
            dispatch(clearBookingState())
        }
     },[currentPage,isSuccess,ownbooking])
     
    const mainHeader = [
        {name:"booking id"},{name:"room"},
        {name:"check in"},{name:"check out"},
        {name:"amount paid"},{name:"by"}
    ]
    const tableHeader = userInfo?.isAdmin?[...mainHeader,{name:"actions"}]:[...mainHeader]

    const tableRow = allBookings?.bookings?.map((booking:any)=>{
        const mainRows={
            cell1:(<Typography fontSize={17} variant="caption">{booking._id}</Typography>),
            cell2:(<Typography fontSize={17} variant="caption">{booking?.room?.name || "May Be This Room deleted"}</Typography>),
            cell3:(<Typography fontSize={17} variant="caption">{moment(booking.checkInDate).format("LL")}</Typography>),
            cell4:(<Typography fontSize={17} variant="caption">{moment(booking.checkOutDate).format("LL")}</Typography>),
            cell5:(<Typography fontSize={17} variant="caption">{booking.amountPaid}$</Typography>),
            cell6:(<Typography fontSize={17} variant="caption">{booking?.user?.name || "May Be This User deleted"}</Typography>),
        }
        if(userInfo?.isAdmin){
            return{
                ...mainRows,
                cell7:(<Button 
                    disableElevation disableRipple 
                    variant="contained" color="error" 
                    size="medium"
                    endIcon={
                        isLoading&&(booking._id==currentBookingId)?
                        <CircularProgress size={25} sx={{color:"#fff"}} />
                        :null
                    }
                    onClick={()=>{
                        dispatch(deleteBooking({token:userInfo.token,id:booking._id}))
                        setCurrentBookingId(booking._id)
                    }}
                >
                    Delete
                </Button>
               )
            }
        }else{
            return {...mainRows}
        }
    })

    return allBookings?.bookings?(
        <Stack direction="column" gap={2}>
            <Typography variant="h4" textTransform="capitalize" fontWeight={500}>
                All {ownbooking?userInfo?.isAdmin?"Admin":`${userInfo.name}`:null} Bookings
            </Typography>
            <TableShared tableHeader={tableHeader} tableRow={tableRow} />
            {
                allBookings?.pages?(
                 <MainPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numOfPages={allBookings.pages} />
                )
                :null
             }
        </Stack>
    )
    :
    (<Loader />)
}
export default AllBookings;