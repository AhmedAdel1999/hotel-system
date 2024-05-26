import { useEffect, useState } from "react";
import { Stack,Divider, Typography, CircularProgress, Button } from "@mui/material";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { clearUserState, updateProfile } from "../features/userSlice";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import defaultImg from "../assets/user-default.jpg"
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import "../styles/_mainform.scss"

const UserProfile = () =>{

    const dispatch  = useAppDispatch();
    const { addToast:notify } = useToasts()
    const {isError,isSuccess,errorMsg,successMsg,userInfo,loadingProfileUpdate} = useAppSelector((state)=>state.user)
    const [profileImg,setProfileImg]=useState<any | null>(userInfo?.avatar?userInfo.avatar:null)

    


    useEffect(()=>{
        dispatch(clearUserState())
       if(isSuccess){
        notify(`${successMsg}`,{
            appearance: 'success',
            autoDismiss:true
        })
       }
       if(isError){
        notify(`${errorMsg}`,{
            appearance: 'error',
            autoDismiss:true
        })
       }
    },[isSuccess,isError])
    

    //update profile function
    const onSubmit = (values:{email:string,name:string,password:string})=>{
        if(typeof(profileImg)!=="string"){
            dispatch(updateProfile({
                data:{...userInfo,...values,avatar:profileImg},
                userId:userInfo.id
            }))
        }
        else{
            dispatch(updateProfile({data:{...userInfo,...values},userId:userInfo.id}))
        }    
    }


    //handle avatar function
    const handleAvatar = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const { files} = e.target;
        const selectedFiles = files as FileList;
        setProfileImg(selectedFiles[0])
    
    }

    const userSchema = () =>{
        const schema = Yup.object().shape({
          name:Yup.string().min(2, 'Too Short!').required("Required"),
          email:Yup.string().email("email must be like this example@gmail.com").required("Required"),
          password:Yup.string().min(6, 'Too Short!').required("Required"),
        })
        return schema
    }


    return(
        <Stack direction="row" justifyContent="center">
            <Stack direction="column" sx={{width: "570px",maxWidth:"570px",minWidth:"300px"}}>
                <Stack pb={2}>
                    <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                        Update Profile
                    </Typography>
                    <Formik 
                        initialValues={{
                            name:`${userInfo?.name}`,
                            email:`${userInfo?.email}`,
                            password:`${userInfo?.password}`,
                        }}
                        onSubmit={onSubmit}
                        validationSchema={userSchema}
                    >
                        <Form className="form-fields">

                            <div className="profile-avatar">
                                <img 
                                    alt="avatar"
                                    src={
                                        profileImg?
                                        typeof(profileImg)=="string"?
                                        `${profileImg}`
                                        :URL.createObjectURL(profileImg):defaultImg
                                    }
                                />
                                {
                                   profileImg?
                                     <label  onClick={()=>{
                                        setProfileImg(null)
                                       }}
                                     >
                                        x
                                    </label>
                                    :
                                    <label htmlFor='prof-img'>+</label>

                                }
                                <input
                                    type="file"
                                    id="prof-img"
                                    style={{display:"none"}}
                                    onChange={handleAvatar}
                                />
                            </div>

                            <div className="field">
                                <label>Full Name</label>
                                <Field type="text" name="name" placeholder="Full Name" />
                                <ErrorMessage name="name" component="span" />
                            </div>

                            <div className="field">
                                <label>E-Mail</label>
                                <Field type="email" name="email" placeholder="E-Mail" />
                                <ErrorMessage name="email" component="span" />
                            </div>

                            <div className="field">
                                <label>Password</label>
                                <Field type="text" name="password" placeholder="Password" />
                                <ErrorMessage name="password" component="span" />
                            </div>
                    
   
                            <Stack width={"100%"} justifyContent={"flex-start"}>
                                <Button 
                                   sx={{width:"fit-content"}}
                                    variant='contained' 
                                    color="primary" 
                                    size='medium'
                                    type="submit"
                                    endIcon={
                                        loadingProfileUpdate?
                                        <CircularProgress size={25} sx={{color:"#fff"}} />
                                        :null
                                    }
                                >
                                    Update
                                </Button>
                            </Stack>
                        </Form>
                    </Formik>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default UserProfile;