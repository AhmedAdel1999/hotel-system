import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MainPagination from "../components/pagination";
import { deleteRoom, getAllRooms,clearRoomState } from "../features/roomSlice";
import { Room } from "../interfaces/Room";
import TableShared from "../components/tableShared";
import Loader from "../components/loading/loader";

const AllRooms = () =>{
    const[currentPage,setCurrentPage] = useState<number>(1)
    const[currentRoomId,setCurrentRoomId]= useState<string>("")
    const{allRooms,isSuccess,successMsg,isLoading} = useAppSelector((state)=>state.rooms)
    const{userInfo} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()
    const { addToast:notify } = useToasts()


    useEffect(()=>{
        if(allRooms?.count>0){
            if(allRooms?.rooms.length==0){
                setCurrentPage(currentPage - 1)
            }
        }
    },[allRooms?.pages])

    useEffect(()=>{
        dispatch(getAllRooms({currentPage,numOfBeds:"",roomType:"",search:""}))
        if(isSuccess){
            notify(`${successMsg}`,{
                appearance: 'success',
                autoDismiss:true
            })
            dispatch(clearRoomState())
        }
     },[currentPage,isSuccess])

    const tableHeader = [
        {name:"id"},{name:"name"},
        {name:"adresse"},{name:"category"},
        {name:"price"},{name:"actions"}
    ]
    const tableRow = allRooms?.rooms?.map((room:Room)=>{
        return{
            cell1:(<Typography fontSize={17} variant="caption">{room._id}</Typography>),
            cell2:(<Typography fontSize={17} variant="caption">{room.name}</Typography>),
            cell3:(<Typography fontSize={17} variant="caption">{room.address}</Typography>),
            cell4:(<Typography fontSize={17} variant="caption">{room.category}</Typography>),
            cell5:(<Typography fontSize={17} variant="caption">{room.pricePerNight}$</Typography>),
            cell6:(
                <Box sx={{display:"flex",gap:"10px 20px"}}>
                    <Button 
                        disableElevation disableRipple 
                        variant="contained" color="primary" 
                        size="medium"
                        component={Link} to={`/editroom/${room._id}`}
                    >
                        Edit
                    </Button>
                    <Button 
                       disableElevation disableRipple 
                       variant="contained" color="error" 
                       size="medium"
                       endIcon={
                            isLoading&&(room._id==currentRoomId)?
                            <CircularProgress size={25} sx={{color:"#fff"}} />
                            :null
                        }
                       onClick={()=>{
                        dispatch(deleteRoom({id:room._id,token:userInfo.token}))
                        setCurrentRoomId(room._id)
                       }}
                    >
                        Delete
                    </Button>
                </Box>
            )
        }
    })

    
    return allRooms?.rooms?(
        <Stack direction="column" gap={2}>
            <Box sx={{
                display:"flex",
                justifyContent:"space-between",
                flexWrap:"wrap",
                gap:"25px"
            }}>
                <Typography variant="h4" fontWeight={500}>All Rooms</Typography>
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
            <TableShared tableHeader={tableHeader} tableRow={tableRow} />
            {
                allRooms?.pages?(
                 <MainPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numOfPages={allRooms.pages} />
                )
                :null
             }
        </Stack>
    )
    :
    (<Loader />)
}
export default AllRooms;