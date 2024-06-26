import { useEffect, useState } from "react";
import { Checkbox, Stack, Typography, FormControlLabel, Button, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { AddNewRoom, clearRoomState } from "../features/roomSlice";
import axios from "axios";
import "../styles/createroom.scss";






const CreateRoomPage = () =>{

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { addToast:notify } = useToasts()
    const {userInfo} = useAppSelector((state)=>state.user)
    const {isSuccess,successMsg,isLoading} = useAppSelector((state)=>state.rooms)

    const[name,setName] = useState<string>("")
    const[description,setDescription] = useState<string>("")
    const[address,setAddress] = useState<string>("12th Floor,Number 1")
    const[pricePerNight,setPricePerNight] = useState<number>(0)
    const[guestCapacity,setGuestCapacity]=useState<number>(1)
    const[numOfBeds,setNumOfBeds]=useState<number>(1)
    const[category,setCategory]=useState<"King"|"Twins"|"Single">("King")
    const[internet,setInternet]=useState<boolean>(false)
    const[breakfast,setBreakfast]=useState<boolean>(false)
    const[airConditioned,setAirConditioned]=useState<boolean>(false)
    const[petsAllowed,setPetsAllowed]=useState<boolean>(false)
    const[roomCleaning,setRoomCleaning]=useState<boolean>(false)
    const[roomImage,setRoomImage] = useState<any>(null)


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
        setRoomImage(selectedFiles[0])
    
      }

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        if(!roomImage || !name || !description || !pricePerNight){
            notify(`You Have To Fill All Fields,Add Image.`,{
                appearance: 'warning',
                autoDismiss:true
            })
        }else{

            dispatch(AddNewRoom({
                data:{
                    name,description,address,category,petsAllowed,airConditioned,
                    pricePerNight,numOfBeds,guestCapacity,internet,breakfast,
                    roomCleaning,image:roomImage,ratings:0,reviews:[]
                },
                userId:userInfo.id
            }))
        }
    }

    return(
        <Stack alignItems="center">
            <Stack width="100%">
                <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                    Create Room
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack gap={2}>
                        <Stack className="field">
                            <label>Name</label>
                            <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" />
                        </Stack>
                        <Stack className="field">
                            <textarea onChange={(e)=>setDescription(e.target.value)}  placeholder="Description" />
                        </Stack>
                        <Stack className="field">
                            <label>Address</label>
                            <input onChange={(e)=>setAddress(e.target.value)} value={address} type="text" placeholder="Address" />
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" gap="20px">
                            <Stack className="selection-field">
                                <label>Guest Capacity</label>
                                <select onChange={(e)=>setGuestCapacity(Number(e.target.value))}>
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
                                <select  onChange={(e)=>setNumOfBeds(Number(e.target.value))}>
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
                                <select  onChange={(e:any)=>setCategory(e.target.value)}>
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
                            <input onChange={(e)=>setPricePerNight(Number(e.target.value))} type="nubmer" placeholder="Price" />
                        </Stack>
                        <Stack className="field">
                            <label>Images</label>
                            <input onChange={handleRoomImg} type="file" />
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
                            Create Room
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}

export default CreateRoomPage;