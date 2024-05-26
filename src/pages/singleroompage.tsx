import { useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { Room } from "../interfaces/Room"
import { Stack } from "@mui/material"
import RoomDetailHeader from "../components/room/roomDetailHeader"
import RoomDescription from "../components/room/roomdescription"
import RoomReview from "../components/room/roomReviews"
const SingleRoomScreen = () =>{

  const {id:roomId} = useParams()
  const {allRooms} = useAppSelector((state)=>state.rooms)
  const roomdetails = allRooms?.filter((room:Room)=>room.id===roomId)[0]

  return(
    <Stack rowGap="30px" pb="10px">
        <RoomDetailHeader roomInfo={roomdetails} />
        <Stack sx={{width:"100%",height:"270px"}}>
            <img 
              loading="lazy"
              alt="room-img"
              src={roomdetails.image}
              style={{width:"100%",height:"100%",objectFit:"fill",objectPosition:"center"}}
            />
        </Stack>
        <RoomDescription roomInfo={roomdetails} />
        <RoomReview roomInfo={roomdetails} />
    </Stack>
  )
}
export default SingleRoomScreen;