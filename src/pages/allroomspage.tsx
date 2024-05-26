import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteRoom, getAllRooms,clearRoomState } from "../features/roomSlice";
import { Room } from "../interfaces/Room";
import TableShared from "../components/tableShared";
import Loader from "../components/loading/loader";

const AllRooms = () =>{

    const[currentRoomId,setCurrentRoomId]= useState<string>("")
    const{allRooms,isSuccess,successMsg,isLoading,isDeletingRoom,isSuccessDeleting} = useAppSelector((state)=>state.rooms)
    const {userInfo} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()
    const { addToast:notify } = useToasts()


    useEffect(()=>{
        dispatch(getAllRooms())
        if(isSuccess || isSuccessDeleting){
            notify(`${successMsg}`,{
                appearance: 'success',
                autoDismiss:true
            })
            dispatch(clearRoomState())
        }
     },[isSuccess,isSuccessDeleting])

    const tableHeader = [
        {name:"id"},{name:"name"},
        {name:"adresse"},{name:"category"},
        {name:"price"},{name:"actions"}
    ]
    const tableRow = allRooms?.map((room:Room)=>{
        return{
            cell1:(<Typography fontSize={17} variant="caption">{room.id}</Typography>),
            cell2:(<Typography fontSize={17} textTransform={"capitalize"} variant="caption">{room.name}</Typography>),
            cell3:(<Typography fontSize={17} variant="caption">{room.address}</Typography>),
            cell4:(<Typography fontSize={17} variant="caption">{room.category}</Typography>),
            cell5:(<Typography fontSize={17} variant="caption">{room.pricePerNight}$</Typography>),
            cell6:(
                <Box sx={{display:"flex",gap:"10px 20px"}}>
                    <Button 
                        disableElevation disableRipple 
                        variant="contained" color="primary" 
                        size="medium"
                        component={Link} to={`/editroom/${room.id}`}
                    >
                        Edit
                    </Button>
                    <Button 
                       disableElevation disableRipple 
                       variant="contained" color="error" 
                       size="medium"
                       endIcon={
                            isDeletingRoom&&(room.id==currentRoomId)?
                            <CircularProgress size={25} sx={{color:"#fff"}} />
                            :null
                        }
                       onClick={()=>{
                        dispatch(deleteRoom({roomId:room.id,userId:userInfo.id}))
                        setCurrentRoomId(room.id)
                       }}
                    >
                        Delete
                    </Button>
                </Box>
            )
        }
    })

    if(isLoading){
        return <Loader />
    }
    
    return(
        <Stack direction="column" gap={2}>
            <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                flexWrap:"wrap",
                gap:"25px"
            }}>
                <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                    All Rooms
                </Typography>
                <Button 
                    color="primary" 
                    variant="contained" 
                    size="medium"
                    disableElevation
                    disableRipple
                    component={Link} to={`/createroom`}
                >
                    Create Room
                </Button>
            </Box>
            {
                allRooms.length?
                <TableShared tableHeader={tableHeader} tableRow={tableRow} />
                :
                <Typography variant="h4" textAlign={"center"} fontWeight={500}>There Is No Rooms Yet..</Typography>
            }
        </Stack>
    )
}
export default AllRooms;