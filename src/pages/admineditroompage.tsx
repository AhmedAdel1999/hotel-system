import { useEffect, useState } from "react";
import { Checkbox, Stack, Typography, FormControlLabel, Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useToasts } from "react-toast-notifications";
import { useNavigate, useParams } from "react-router-dom";
import { clearRoomState, updateRoom } from "../features/roomSlice";
import { Room } from "../interfaces/Room";
import "../styles/createroom.scss";








const AdminEditRoomPage = () =>{

    const dispatch = useAppDispatch()
    const {roomId} = useParams()
    const navigate = useNavigate()
    const { addToast:notify } = useToasts()
    const {userInfo} = useAppSelector((state)=>state.user)
    const {isSuccess,successMsg,isLoading,allRooms} = useAppSelector((state)=>state.rooms)
    const currentRoom = allRooms?.filter((room:Room)=>room.id==roomId)[0]


    const[name,setName] = useState<string>(currentRoom.name)
    const[description,setDescription] = useState<string>(currentRoom.description)
    const[address,setAddress] = useState<string>(currentRoom.address)
    const[pricePerNight,setPricePerNight] = useState<number>(currentRoom.pricePerNight)
    const[guestCapacity,setGuestCapacity]=useState<number>(currentRoom.guestCapacity)
    const[numOfBeds,setNumOfBeds]=useState<number>(currentRoom.numOfBeds)
    const[category,setCategory]=useState<"King"|"Twins"|"Single">(currentRoom.category)
    const[internet,setInternet]=useState<boolean>(currentRoom.internet)
    const[breakfast,setBreakfast]=useState<boolean>(currentRoom.breakfast)
    const[airConditioned,setAirConditioned]=useState<boolean>(currentRoom.airConditioned)
    const[petsAllowed,setPetsAllowed]=useState<boolean>(currentRoom.petsAllowed)
    const[roomCleaning,setRoomCleaning]=useState<boolean>(currentRoom.roomCleaning)
    const[updatedRoomImage,setUpdatedRoomImage] = useState<any>(null)


    useEffect(()=>{
        dispatch(clearRoomState())
      if(isSuccess){
        notify(`${successMsg}.`,{
            appearance: 'success',
            autoDismiss:true
        })
        navigate("/allrooms")
      }
    },[isSuccess])

    const handleRoomImg = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const { files} = e.target;
        const selectedFiles = files as FileList;
        setUpdatedRoomImage(selectedFiles[0])
      }

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()

        if(updatedRoomImage){
            dispatch(updateRoom({
                data:{
                    ...currentRoom,
                    name,description,address,category,petsAllowed,airConditioned,
                    pricePerNight,numOfBeds,guestCapacity,internet,breakfast,
                    roomCleaning,image:updatedRoomImage
                },
                roomId,
                userId:userInfo.id
            }))
        
        
        }else{
            dispatch(updateRoom({
                data:{
                    ...currentRoom,
                    name,description,address,category,petsAllowed,airConditioned,
                    pricePerNight,numOfBeds,guestCapacity,internet,breakfast,
                    roomCleaning
                },
                roomId,
                userId:userInfo.id
            }))
        }
    }

    return(
        <Stack alignItems="center">
            <Stack width="100%">
                <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2" mb={2}>
                    Update Room
                </Typography>
                <Stack sx={{width:"100%",height:"250px"}}>
                    <img 
                      loading="lazy"
                      alt="room-img"
                      src={updatedRoomImage?URL.createObjectURL(updatedRoomImage):currentRoom.image}
                      style={{width:"100%",height:"100%",objectFit:"fill",objectPosition:"center"}}
                    />
                </Stack>
                <form onSubmit={handleSubmit}>
                    <Stack gap={2}>
                        <Stack className="field">
                            <label>Name</label>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" />
                        </Stack>
                        <Stack className="field">
                            <textarea value={description} onChange={(e)=>setDescription(e.target.value)}  placeholder="Description" />
                        </Stack>
                        <Stack className="field">
                            <label>Address</label>
                            <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Address" />
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" gap="20px">
                            <Stack className="selection-field">
                                <label>Guest Capacity</label>
                                <select value={guestCapacity} onChange={(e)=>setGuestCapacity(Number(e.target.value))}>
                                    {
                                        [1,2,3,4,5].map((ele)=>{
                                            return(
                                                <option value={`${ele}`} key={ele}>{ele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Stack>
                            <Stack className="selection-field">
                                <label>Num Of Beds</label>
                                <select value={numOfBeds} onChange={(e)=>setNumOfBeds(Number(e.target.value))}>
                                    {
                                        [1,2,3,4,5].map((ele)=>{
                                            return(
                                                <option value={`${ele}`} key={ele}>{ele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Stack>
                            <Stack className="selection-field">
                                <label>Room Type</label>
                                <select value={category} onChange={(e:any)=>setCategory(e.target.value)}>
                                    {
                                        ["King","Single","Twins"].map((ele)=>{
                                            return(
                                                <option value={`${ele}`} key={ele}>{ele}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Stack>
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" gap="20px">
                            <FormControlLabel 
                                    label="Internet"
                                    control={
                                        <Checkbox 
                                            disableFocusRipple
                                            disableRipple
                                            checked={internet}
                                            onChange={()=>setInternet(!internet)}
                                        />
                                    } 
                            />
                            <FormControlLabel 
                                    label="Breakfast"
                                    control={
                                        <Checkbox 
                                            disableFocusRipple
                                            disableRipple
                                            checked={breakfast}
                                            onChange={()=>setBreakfast(!breakfast)}
                                        />
                                    } 
                            />
                            <FormControlLabel 
                                    label="Air Conditioned"
                                    control={
                                        <Checkbox 
                                            disableFocusRipple
                                            disableRipple
                                            checked={airConditioned}
                                            onChange={()=>setAirConditioned(!airConditioned)}
                                        />
                                    } 
                            />
                            <FormControlLabel 
                                    label="Pets Allowed"
                                    control={
                                        <Checkbox 
                                            disableFocusRipple
                                            disableRipple
                                            checked={petsAllowed}
                                            onChange={()=>setPetsAllowed(!petsAllowed)}
                                        />
                                    } 
                            />
                            <FormControlLabel 
                                    label="Room Cleaning"
                                    control={
                                        <Checkbox 
                                            disableFocusRipple
                                            disableRipple
                                            checked={roomCleaning}
                                            onChange={()=>setRoomCleaning(!roomCleaning)}
                                        />
                                    } 
                            />
                        </Stack>
                        <Stack className="field">
                            <label>Price</label>
                            <input value={pricePerNight} onChange={(e)=>setPricePerNight(Number(e.target.value))} type="nubmer" placeholder="Price" />
                        </Stack>
                        <Stack className="field">
                            <label>Images</label>
                            <input onChange={handleRoomImg} type="file" multiple />
                        </Stack>
                        <Button
                            disableFocusRipple
                            disableRipple
                            type="submit"
                            size="medium"
                            variant='contained'
                            color='primary'
                            sx={{width:"fit-content"}}
                            endIcon={
                                isLoading?
                                <CircularProgress size={25} sx={{color:"#fff"}} />
                                :null
                            }
                        >
                            Update Room
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}

export default AdminEditRoomPage;