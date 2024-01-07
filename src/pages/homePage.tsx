import { useEffect, useState } from "react";
import { Typography, Stack, Grid,Alert, AlertTitle,} from '@mui/material'
import { useAppDispatch,useAppSelector } from "../app/hooks"
import { getAllRooms } from "../features/roomSlice";
import SearchRoom from "../components/room/searchroom/searchRoom";
import RoomCard from "../components/room/roomCard/roomCard";
import { Room } from "../interfaces/Room";
import MainPagination from "../components/pagination";


const HomeScreen = () =>{
    const {allRooms} = useAppSelector((state)=>state.rooms)
    const [currentPage,setCurrentPage]=useState<number>(1)
    const [numOfBeds,setNumOfBeds]=useState<number|string>("1")
    const [roomType,setRoomType]=useState<string>("King")
    const [search,setSearch]=useState<string>("")


    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(getAllRooms({currentPage,numOfBeds,roomType,search}))
    },[currentPage,numOfBeds,roomType,search])

    return(
        <Stack direction="column" rowGap="20px">
            <Typography sx={{fontWeight:"bold",color:"#444"}} variant="h5">
                All Rooms
            </Typography>
            <SearchRoom 
                setNumOfBeds={setNumOfBeds}
                setRoomType={setRoomType}
                setSearch={setSearch}
                numOfBeds={numOfBeds}
                roomType={roomType}
             />
             {
                allRooms?.rooms?.length?(
                        <Grid container spacing={4}>
                            {
                                allRooms?.rooms.map((room:Room)=>{
                                    return(
                                        <Grid key={room._id} item xs={12} sm={6} md={4} lg={3}>
                                            <RoomCard 
                                            roomInfo={room}
                                            />
                                        </Grid>
                                    )
                                })
                            }  
                        </Grid>
                ):
                (
                        <Alert severity="info">
                            <AlertTitle>No Rooms Avaliable</AlertTitle>
                        </Alert>
                )
             }
             {
                allRooms?.pages?(
                 <MainPagination setCurrentPage={setCurrentPage} numOfPages={allRooms.pages} />
                )
                :null
             }
             
        </Stack>
    )
}
export default HomeScreen