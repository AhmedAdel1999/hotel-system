import { useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { Room } from "../interfaces/Room"
import { Stack } from "@mui/material"
import RoomImgSlider from "../components/room/rommimgslider"
import RoomDetailHeader from "../components/room/roomDetailHeader"
import RoomDescription from "../components/room/roomdescription"
import RoomReview from "../components/room/roomReviews"
const SingleRoomScreen = () =>{

  const {id:roomId} = useParams()
  const {allRooms} = useAppSelector((state)=>state.rooms)
  const roomdetails = allRooms?.rooms.filter((room:Room)=>room._id===roomId)[0]

  return(
    <Stack rowGap="30px" pb="10px">
        <RoomDetailHeader roomInfo={roomdetails} />
        <RoomImgSlider sliderImgs={roomdetails.images} />
        <RoomDescription roomInfo={roomdetails} />
        <RoomReview roomInfo={roomdetails} />
    </Stack>
  )
}
export default SingleRoomScreen;