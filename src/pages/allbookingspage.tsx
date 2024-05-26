import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { User } from "../interfaces/User";
import TableShared from "../components/tableShared";
import { getAllUsers } from "../features/userSlice";
import moment from "moment";





const AllBookings = ({ownbooking}:{ownbooking?:boolean}) =>{

    const dispatch = useAppDispatch()
    const{userInfo,allUsers} = useAppSelector((state)=>state.user)
    let allBookings = userInfo.isAdmin? ownbooking ? [...userInfo.bookings]:
    allUsers.map((user:User)=>[...user.bookings]).flat():[...userInfo.bookings]


    useEffect(()=>{
        dispatch(getAllUsers())
    },[])
     
    const tableHeader =[
        {name:"booking id"},{name:"room"},
        {name:"check in"},{name:"check out"},
        {name:"amount paid"},{name:"days of stay"},{name:"by"}
    ]

    const tableRow = allBookings?.map((booking:any)=>{
        return{
            cell1:(<Typography fontSize={17} variant="caption">{booking.bookingId}</Typography>),
            cell2:(<Typography fontSize={17} variant="caption">{booking.roomName}</Typography>),
            cell3:(<Typography fontSize={17} variant="caption">{moment(booking.checkInDate).format("LL")}</Typography>),
            cell4:(<Typography fontSize={17} variant="caption">{moment(booking.checkOutDate).format("LL")}</Typography>),
            cell5:(<Typography fontSize={17} variant="caption">{booking.amountPaid}$</Typography>),
            cell6:(<Typography fontSize={17} variant="caption">{booking.daysOfStay}</Typography>),
            cell7:(<Typography fontSize={17} variant="caption">{booking.userName}</Typography>),
        }
    })

    return (
        <Stack direction="column" gap={2}>
            <Typography textTransform="capitalize" sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                All {ownbooking?userInfo?.isAdmin?"Admin":`${userInfo.name}`:null} Bookings
            </Typography>
            {
                allBookings.length?
                <TableShared tableHeader={tableHeader} tableRow={tableRow} />
                :
                <Typography variant="h4" textAlign={"center"} textTransform="capitalize" fontWeight={500}>
                     There Is No Bookings Yet..
                </Typography>
            }
            
        </Stack>
    )
}
export default AllBookings;