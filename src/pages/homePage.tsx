import { useEffect, useState } from "react";
import { Typography, Stack, Grid,Alert, AlertTitle,} from '@mui/material'
import { useAppDispatch,useAppSelector } from "../app/hooks"
import { getAllRooms } from "../features/roomSlice";
import SearchRoom from "../components/room/searchroom/searchRoom";
import RoomCard from "../components/room/roomCard/roomCard";
import { Room } from "../interfaces/Room";


const HomeScreen = () =>{

    const {allRooms} = useAppSelector((state)=>state.rooms)
    const [numOfBeds,setNumOfBeds]=useState<number|string>("Choose Num OF Beds")
    const [roomType,setRoomType]=useState<string>("Choose Room Type")
    const [search,setSearch]=useState<string>("")
    const [finleRoomResult,setFinalRoomResult] = useState<Room[]>([...allRooms])
    const dispatch = useAppDispatch();


    useEffect(()=>{
        let rooms:Room[]=[]
       if(search){
         rooms=[...allRooms.filter((room:Room)=>room.name.includes(search))]
       }
       if(!search){
        rooms=[...allRooms]
      }
       if(numOfBeds!=="Choose Num OF Beds" || roomType!=="Choose Room Type"){
         rooms=[...rooms.filter((room:Room)=>room.numOfBeds==numOfBeds && room.category===roomType)]
       }
       setFinalRoomResult([...rooms])
    },[search,numOfBeds,roomType,allRooms.length])

    useEffect(()=>{
        dispatch(getAllRooms())
    },[])

    return(
        <Stack direction="column" rowGap="20px">
            <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
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
                finleRoomResult?.length?(
                        <Grid container spacing={4}>
                            {
                                finleRoomResult?.map((room:Room)=>{
                                    return(
                                        <Grid key={room.id} item xs={12} sm={6} md={4} lg={3}>
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
        </Stack>
    )
}
export default HomeScreen