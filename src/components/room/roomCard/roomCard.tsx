import { Link } from "react-router-dom";
import { Room } from "../../../interfaces/Room";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import {Card,Button,Stack,Rating,CardMedia,CardContent,CardActions, Typography} from '@mui/material';
import "./roomCard.scss"

type RoomCardProps = {
    roomInfo:Room
}


const RoomCard = ({roomInfo}:RoomCardProps) =>{

    return(
        <Card className="roomcard">
          <CardMedia
            component='img'
            className="cardimg"
            image={`${roomInfo.image}`}
            alt='image'
          />
          <CardContent>

            <Typography variant="h5"className="roomlink" gutterBottom>
                <Link to={`/singleroom/${roomInfo.id}`}>{roomInfo.name}</Link>
            </Typography>

            <Typography variant="h5" className="roompriceinfo" gutterBottom>
                ${roomInfo.pricePerNight} / Per Night
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

          </CardContent>
          <CardActions>
            <Button 
                component={Link} 
                fullWidth
                disableRipple
                disableElevation
                to={`/singleroom/${roomInfo.id}`} 
                variant="contained" 
                className="cardbtnlink"
            >
                View Details
            </Button>
          </CardActions>
        </Card>
    )
}
export default RoomCard;