import {useEffect, useState} from "react"
import { Room } from "../../interfaces/Room";
import {Grid,Typography,Card,CardContent,Alert,AlertTitle,Box} from '@mui/material';
import PaypalButton from "../paymentbtn";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { AddNewBooking,clearUserState } from "../../features/userSlice";
import { useToasts } from "react-toast-notifications";
import { PaymentInfo } from "../../interfaces/User";
import TableShared from "../tableShared";


type RoomDescriptionProps={
    roomInfo:Room
}

const RoomDescription = ({roomInfo}:RoomDescriptionProps) =>{


  let currentDay = new Date();  
  let nextDay = new Date(currentDay);
  nextDay.setDate(currentDay.getDate() + 2);

  const [CheckinOutDate, setCheckinOutDate] = useState<any>([
    dayjs(currentDay),
    dayjs(nextDay),
  ]);

  const totalDays = CheckinOutDate[1].$D - CheckinOutDate[0].$D
  const {userInfo} = useAppSelector((state)=>state.user)
  const {isSuccess,isError,successMsg,errorMsg} = useAppSelector((state)=>state.user)
  const { addToast:notify } = useToasts()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useEffect(()=>{
    if(isError){
      
      notify(`${errorMsg}`,{
          appearance: 'warning',
          autoDismiss:true
      })
      dispatch(clearUserState())
     }else{

      if(isSuccess){
        notify(`${successMsg}`,{
            appearance: 'success',
            autoDismiss:true
        })
        dispatch(clearUserState())
        navigate("/")
       }
     }
  },[isSuccess,isError])


const tranSuccess = (payment:any)=>{

  const paymentInfo:PaymentInfo={
    id:payment.paymentID,
    email_address:payment.email
  }

  dispatch(AddNewBooking({
    data:{
        ...userInfo,
        bookings:[
          ...userInfo.bookings,
          {
            roomName:roomInfo.name,
            userName:userInfo.name,
            bookingId:paymentInfo.id,
            checkInDate:CheckinOutDate[0] as Date,
            checkOutDate:CheckinOutDate[1] as Date,
            amountPaid:totalDays*roomInfo.pricePerNight,
            daysOfStay:totalDays,
          }
        ]
    },
    userId:userInfo.id,
  }))
}

const tableHeader = [
  {name:"Guests"},{name:"Beds"},
  {name:"Internet"},{name:"breakfast"},{name:"Air Conditioned"},
  {name:"Pets Allowed"},{name:"Room Cleaning"},
]

const tableRow = [{
  cell1:(<Typography fontSize={17} variant="caption">{roomInfo.guestCapacity}</Typography>),
  cell2:(<Typography fontSize={17} variant="caption">{roomInfo.numOfBeds}</Typography>),
  cell3:(<Typography fontSize={17} variant="caption">{roomInfo.internet?<DoneIcon />:<ClearIcon />}</Typography>),
  cell4:(<Typography fontSize={17} variant="caption">{roomInfo.breakfast?<DoneIcon />:<ClearIcon />}</Typography>),
  cell5:(<Typography fontSize={17} variant="caption">{roomInfo.airConditioned?<DoneIcon />:<ClearIcon />}</Typography>),
  cell6:(<Typography fontSize={17} variant="caption">{roomInfo.petsAllowed?<DoneIcon />:<ClearIcon />}</Typography>),
  cell7:(<Typography fontSize={17} variant="caption">{roomInfo.roomCleaning?<DoneIcon />:<ClearIcon />}</Typography>),
}]
    return(
        <Grid container gap={4}>
            <Grid item xs={12} md={7}>
                <Typography variant="h4" fontWeight={500} gutterBottom>Description</Typography>
                <Typography variant="subtitle2" gutterBottom>{roomInfo.description}</Typography>
                <Typography variant="h4" fontWeight={500} gutterBottom>Features:</Typography>
                <TableShared tableHeader={tableHeader} tableRow={tableRow} />
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                       <Typography variant="h4" gutterBottom>${roomInfo.pricePerNight} / Per Night</Typography>
                       <Typography variant="subtitle2" gutterBottom>Pick Check In & Check Out Date</Typography>
                       <DemoContainer components={['DateRangePicker']} sx={{marginBottom:"10px"}}>
                          <DemoItem component="DateRangePicker">
                            <DateRangePicker
                                localeText={{ start: 'Check-in', end: 'Check-out' }}
                                value={CheckinOutDate}
                                onChange={(newValue) => setCheckinOutDate(newValue)}
                              />
                          </DemoItem>
                       </DemoContainer>
                       {
                        Object.keys(userInfo).length>0?
                        (
                          <Alert severity="info" sx={{width:"fit-content",marginBottom:"10px"}}>
                              <AlertTitle>
                                  Room Is Available Pay ${totalDays*roomInfo.pricePerNight}
                              </AlertTitle>
                          </Alert>
                        )
                        :
                        (
                          <Alert severity="info">
                              <AlertTitle>Please <Link to="/login">Sign in</Link> for booking </AlertTitle>
                          </Alert>
                        )
                       }
                       {
                        userInfo?
                          <Box sx={{marginTop:"10px"}}>
                            <PaypalButton
                              total={totalDays}
                              tranSuccess={tranSuccess} 
                            />
                          </Box>
                        :
                        null
                       }
                    </CardContent>
                </Card>
            </Grid>
        </Grid> 
    )
}
export default RoomDescription;