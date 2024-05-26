import  { useState,useEffect } from "react";
import { Reviews, Room } from "../../interfaces/Room";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {Typography,Stack,Alert,AlertTitle,Grid,Rating, Box, TextField,Button} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import { AddRoomReview, clearRoomState,getSingleRoom } from "../../features/roomSlice";



type RoomReviewProps={
    roomInfo:Room
}
const RoomReview = ({roomInfo}:RoomReviewProps) =>{

    const { userInfo } = useAppSelector((state)=>state.user)
    const { isError,errorMsg,isSuccess,successMsg,isLoading } = useAppSelector((state)=>state.rooms)
    const [ratingValue,setRatingValue] = useState<number | null>(null)
    const [comment,setComment]=useState<string>("")
    const { addToast:notify } = useToasts()
    const dispatch = useAppDispatch()

    useEffect(()=>{
       if(isError){
        notify(`${errorMsg}`,{
            appearance: 'warning',
            autoDismiss:true
        })
        dispatch(clearRoomState())
       }
       if(isSuccess){
        notify(`${successMsg}`,{
            appearance: 'success',
            autoDismiss:true
        })
        setComment("")
        setRatingValue(0)
        dispatch(getSingleRoom(roomInfo.id))
        dispatch(clearRoomState())
       }
    },[isError,isSuccess])
    
    const AddReview = () =>{
        if(!comment || !ratingValue){
            notify(`You Have Too Add A Comment And Raiting Together.`,{
                appearance: 'error',
                autoDismiss:true
            })
        }else{
            dispatch(AddRoomReview({
                data:{
                    ...roomInfo,
                    reviews:[
                        ...roomInfo.reviews,
                        {
                            userId:userInfo.id,
                            name:userInfo.name,
                            rating:ratingValue,
                            comment:comment,
                        }
                    ],
                    ratings: roomInfo.reviews.length?
                    (Number(ratingValue+roomInfo.ratings) / 5):ratingValue
                },
                userId:userInfo.id,
                roomId:roomInfo.id
            }))
        }
        
    }

    return(
        <Grid container>
            <Grid item xs={12} md={6}>
                <Typography fontWeight={500} variant="h4" mb={4}>
                    Reviews
                </Typography>
                {
                    Object.keys(userInfo).length===0?
                    (
                        <Alert severity="info">
                            <AlertTitle><Link to="/login">Sign in</Link> to write a review</AlertTitle>
                        </Alert>
                    )
                    :
                    (
                        <Box
                          sx={{
                            display:"flex",
                            flexDirection:"column",
                            rowGap:"10px",
                            '& .commentrating':{
                                color:"#444"
                            },
                            '& button':{
                                width:"fit-content",
                                textTransform:"capitalize"
                            }
                          }}
                        >
                            <Rating
                                precision={0.5}
                                value={ratingValue}
                                size='medium'
                                className="commentrating"
                                onChange={(event, newValue) => {
                                    setRatingValue(newValue);
                                  }}
                                icon={<StarIcon fontSize='inherit' />}
                                emptyIcon={<StarBorderIcon fontSize='inherit' />}
                            />
                            <TextField 
                                onChange={
                                    (e)=>setComment(e.target.value)
                                }
                                value={comment}
                                placeholder="Comments"
                                multiline
                                rows={4}
                            />
                            <Button 
                               variant='contained' 
                               color="primary" 
                               size='medium'
                               onClick={()=>AddReview()}
                               endIcon={
                                 isLoading?
                                 <CircularProgress size={25} sx={{color:"#fff"}} />
                                 :null
                                }
                            >
                                Add Review
                            </Button>
                        </Box>
                    )
                }
                <Stack rowGap="10px" mt={3}>
                {
                    roomInfo.reviews.map((rev:Reviews)=>{
                        return(
                            <Stack key={rev.userId} rowGap="5px">
                                <Typography textTransform={"capitalize"} fontWeight={500} variant="h5">
                                    {rev.name}
                                </Typography>
                                <Box
                                  sx={{
                                    display:"flex",
                                    gap:"2px",
                                    '& .commentrating':{
                                        color:"#444"
                                    }
                                  }}
                                >
                                    <Rating
                                        value={rev.rating}
                                        precision={0.5}
                                        readOnly
                                        size='medium'
                                        className="commentrating"
                                        icon={<StarIcon fontSize='inherit' />}
                                        emptyIcon={<StarBorderIcon fontSize='inherit' />}
                                    />
                                    <Typography variant="subtitle2">{`(${rev.rating} Review)`}</Typography>
                                </Box>
                                <Typography variant="body1">{rev.comment}</Typography>
                            </Stack>
                        )
                    })
                }
                </Stack>
            </Grid>
        </Grid>
    )
}
export default RoomReview;