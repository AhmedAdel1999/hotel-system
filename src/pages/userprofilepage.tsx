import { useEffect, useState } from "react";
import { Stack,Divider, Typography } from "@mui/material";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { clearUserState, updatePassword, updateProfile } from "../features/userSlice";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import defaultImg from "../assets/user-default.jpg"
import { useToasts } from "react-toast-notifications";
import * as Yup from "yup";
import "../styles/_mainform.scss"

const UserProfile = () =>{

    const dispatch  = useAppDispatch();
    const { addToast:notify } = useToasts()
    const {isError,isSuccess,errorMsg,successMsg,userInfo} = useAppSelector((state)=>state.user)
    const [avatar,setAvatar]=useState<any | null>(null)
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
    const onUpdateProfile = (values:{name:string,email:string})=>{
        if(avatar){
            dispatch(updateProfile({token:userInfo.token,data:{...values,avatar}}))
        }
        else{
            dispatch(updateProfile({token:userInfo.token,data:{...values}}))
        }    
    }

    //update password function
    const onPasswordUpdate = (values:{oldPassword:string,newPassword:string}) =>{
         dispatch(updatePassword({token:userInfo.token,data:{...values}}))
    }

    //handle avatar function
    const handleAvatar = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const { files} = e.target;
        const selectedFiles = files as FileList;
        const fd = new FormData();
        fd.append('file',selectedFiles[0])
        fd.append("upload_preset","ggimages")
        fd.append("api_key", "372336693865194")
        setAvatar(fd)
        setProfileImg(selectedFiles[0])
    
    }

    const userSchema = () =>{
        const schema = Yup.object().shape({
          name:Yup.string().min(2, 'Too Short!').required("Required"),
          email:Yup.string().email("email must be like this example@gmail.com").required("Required"),
        })
        return schema
    }

    const passwordSchema = () =>{
        const schema = Yup.object().shape({
          oldPassword:Yup.string().min(6, 'Too Short!').required("Required"),
          newPassword:Yup.string().min(6, 'Too Short!').required("Required"),
        })
        return schema
    }

    return(
        <Stack direction="row" justifyContent="center">
            <Stack direction="column" sx={{width: "570px",maxWidth:"570px",minWidth:"300px"}}>
                <Stack pb={2}>
                    <Typography variant="h5" fontWeight={500}>Update Profile</Typography>
                    <Formik 
                        initialValues={{
                            name:`${userInfo?.name}`,
                            email:`${userInfo?.email}`,
                        }}
                        onSubmit={onUpdateProfile}
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
                                        setAvatar(null)
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
                    
                            
                            <div className="submitAndredirect">
                                <button className="submit" type="submit">
                                   <span>Update</span>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </Stack>
                <Divider />
                <Stack pt={2}>
                    <Typography mb={2} variant="h5" fontWeight={500}>Update Password</Typography>
                    <Formik 
                        initialValues={{
                            oldPassword:"",
                            newPassword:"",
                        }}
                        onSubmit={onPasswordUpdate}
                        validationSchema={passwordSchema}
                    >
                        <Form className="form-fields">

                            <div className="field">
                                <label>Old Password</label>
                                <Field type="text" name="oldPassword" placeholder="Old Password" />
                                <ErrorMessage name="oldPassword" component="span" />
                            </div>

                            <div className="field">
                                <label>New Password</label>
                                <Field type="text" name="newPassword" placeholder="New Password" />
                                <ErrorMessage name="newPassword" component="span" />
                            </div>
                    
                            
                            <div className="submitAndredirect">
                                <button className="submit" type="submit">
                                   <span>Update</span>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default UserProfile;