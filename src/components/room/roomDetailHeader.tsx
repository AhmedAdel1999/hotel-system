import { Box,Rating,Typography,Stack } from "@mui/material"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Room } from "../../interfaces/Room"

type RoomDetailProps={
    roomInfo:Room
}

const RoomDetailHeader = ({roomInfo}:RoomDetailProps) =>{
    return(
        <Box 
           sx={{
            color:"#444",
            '&>h3':{
                fontWeight:"bold",
                fontSize:"35px"
            },
            '& .roomrating':{
                color:"#444"
            }
           }}
        >
            <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444",textTransform:"capitalize"}} variant="h2" gutterBottom>
                {roomInfo.name}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {roomInfo.address}
            </Typography>
            <Stack spacing={0.5} direction="row">
                <Rating
                    value={roomInfo.ratings}
                    precision={0.5}
                    readOnly
                    size='medium'
                    className="roomrating"
                    icon={<StarIcon fontSize='inherit' />}
                    emptyIcon={<StarBorderIcon fontSize='inherit' />}
                />
                <Typography>
                    {`(${Math.ceil(roomInfo.ratings)}) Reviews`}
                </Typography>
            </Stack>
        </Box>
    )
}
export default RoomDetailHeader;