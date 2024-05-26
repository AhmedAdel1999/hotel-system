import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getAllUsers, deleteUser, clearUserState } from "../features/userSlice";
import { User } from "../interfaces/User";
import TableShared from "../components/tableShared";
import Loader from "../components/loading/loader";

const AllUsers = () =>{

    const[currentUserId,setCurrentUserId] = useState<string>("")
    const{allUsers,userInfo,isSuccess,successMsg,isLoading} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()
    const { addToast:notify } = useToasts()

    
    
    useEffect(()=>{
        dispatch(getAllUsers())
        if(isSuccess){
            notify(`${successMsg}`,{
                appearance: 'success',
                autoDismiss:true
            })
            dispatch(clearUserState())
        }
     },[isSuccess])

    const tableHeader = [
        {name:"user id"},{name:"avatar"},
        {name:"name"},{name:"email"},
        {name:"is admin"},{name:"actions"}
    ]
    const tableRow = allUsers?.map((user:User)=>{
        return{
            cell1:(<Typography fontSize={17} variant="caption">{user.id}</Typography>),
            cell2:(<Avatar alt="Remy Sharp" src={`${user.avatar}`}/>),
            cell3:(<Typography fontSize={17} variant="caption">{user.name}</Typography>),
            cell4:(<Typography fontSize={17} variant="caption">{user.email}</Typography>),
            cell5:(<Typography fontSize={17} variant="caption">{user.isAdmin?"Yes":"No"}</Typography>),
            cell6:(
                <Box sx={{display:"flex",gap:"10px 20px"}}>
                    <Button 
                        disableElevation disableRipple 
                        variant="contained" color="primary" 
                        size="medium"
                        component={Link} to={`/edituser/${user.id}`}
                    >
                        Edit
                    </Button>
                    {
                        user.isAdmin?
                        null:
                        <Button 
                            disableElevation disableRipple 
                            variant="contained" color="error" 
                            size="medium"
                            endIcon={
                                    isLoading&&(user.id==currentUserId)?
                                    <CircularProgress size={25} sx={{color:"#fff"}} />
                                    :null
                                }
                                onClick={()=>{
                                    dispatch(deleteUser(user.id))
                                    setCurrentUserId(user.id)
                                }}
                            >
                            Delete
                        </Button>
                    }
                </Box>
            )
        }
    })

    
    return allUsers?.length?(
        <Stack direction="column" gap={2}>
            <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                All Users
            </Typography>
            <TableShared tableHeader={tableHeader} tableRow={tableRow} />
        </Stack>
    )
    :
    (<Loader />)
}
export default AllUsers;