import React, { useEffect, useState } from "react";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { clearUserState, register } from "../../features/userSlice";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import { UserRegister } from "../../interfaces/User";
import { useNavigate,Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import defaultImg from "../../assets/user-default.jpg"
import ErrorMsg from "../../components/error";
import * as Yup from "yup";

import "./auth.scss"



const RegisterComponent = () => {
  
  const dispatch  = useAppDispatch();
  const navigate = useNavigate();
  const [avatar,setAvatar]=useState<any | null>(null)
  const [profileImg,setProfileImg]=useState<any | null>(null)
  const {isError,isSuccess,errorMsg,isLoading} = useAppSelector((state)=>state.user)


  useEffect(()=>{
    dispatch(clearUserState())
    if(isSuccess){
      navigate("/")
    }
  },[isSuccess])

  const onSubmit = (values:Omit<UserRegister,"avatar">)=>{
    if(avatar){
        dispatch(register({...values,avatar:avatar}))
    }else{
        dispatch(register(values))
    } 
  }

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
  const schema = () =>{
    const schema = Yup.object().shape({
      name:Yup.string().min(2, 'Too Short!').required("Required"),
      email:Yup.string().email("email must be like this example@gmail.com").required("Required"),
      password:Yup.string().min(6, 'Too Short!').required("Required"),
    })
    return schema
  }
 

  return (
    <div className="auth">
        <div className="auth-container">
          
          <Formik 
            initialValues={{
                name:"",
                email:"",
                password:"",
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            <Form className="form-fields">

              <div className="profile-avatar">
                <img 
                  alt="avatar"
                  src={profileImg?URL.createObjectURL(profileImg):defaultImg}
                />
                <label htmlFor='prof-img'>+</label>
                <input
                    type="file"
                    id="prof-img"
                    style={{display:"none"}}
                    onChange={handleAvatar}
                  />
              </div>

              {
                isError&&
                <ErrorMsg msg={errorMsg} />
              }

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
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="span" />
              </div>

              
              <div className="submitAndredirect">
                <button className="submit" type="submit">
                  {
                    isLoading?
                    <CircularProgress style={{width:"35px",height:"35px"}} color="inherit" />
                    :
                    <span>Register</span>
                  }
                </button>
                <div className="redirect">
                    <span>Already have account?</span>
                    <span><Link to="/login">Login</Link></span>
                </div>
              </div>
              
            </Form>
          </Formik>
          
        </div>
    </div>
  );
}

export default RegisterComponent;