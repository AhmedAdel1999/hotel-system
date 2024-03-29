import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useToasts } from "react-toast-notifications";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MainPagination from "../components/pagination";
import { getAllUsers, deleteUser, clearUserState } from "../features/userSlice";
import { User } from "../interfaces/User";
import TableShared from "../components/tableShared";
import Loader from "../components/loading/loader";

const AllUsers = () =>{
    const[currentPage,setCurrentPage] = useState<number>(1)
    const[currentUserId,setCurrentUserId] = useState<string>("")
    const{allUsers,userInfo,isSuccess,successMsg,isLoading} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch()
    const { addToast:notify } = useToasts()

    
    useEffect(()=>{
        if(allUsers?.count>0){
            if(allUsers?.users.length==0){
                setCurrentPage(currentPage - 1)
            }
        }
    },[allUsers?.pages])
    
    useEffect(()=>{
        dispatch(getAllUsers({token:userInfo.token,currentPage}))
        if(isSuccess){
            notify(`${successMsg}`,{
                appearance: 'success',
                autoDismiss:true
            })
            dispatch(clearUserState())
        }
     },[currentPage,isSuccess])

    const tableHeader = [
        {name:"user id"},{name:"avatar"},
        {name:"name"},{name:"email"},
        {name:"is admin"},{name:"actions"}
    ]
    const tableRow = allUsers?.users?.map((user:User)=>{
        return{
            cell1:(<Typography fontSize={17} variant="caption">{user._id}</Typography>),
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
                        component={Link} to={`/edituser/${user._id}`}
                    >
                        Edit
                    </Button>
                    <Button 
                       disableElevation disableRipple 
                       variant="contained" color="error" 
                       size="medium"
                       endIcon={
                            isLoading&&(user._id==currentUserId)?
                            <CircularProgress size={25} sx={{color:"#fff"}} />
                            :null
                        }
                        onClick={()=>{
                            dispatch(deleteUser({token:userInfo.token,id:user._id}))
                            setCurrentUserId(user._id)
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            )
        }
    })

    
    return allUsers?.users?(
        <Stack direction="column" gap={2}>
            <Typography variant="h4" fontWeight={500}>All Users</Typography>
            <TableShared tableHeader={tableHeader} tableRow={tableRow} />
            {
                allUsers?.pages?(
                 <MainPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numOfPages={allUsers.pages} />
                )
                :null
             }
        </Stack>
    )
    :
    (<Loader />)
}
export default AllUsers;