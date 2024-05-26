import { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography,FormControlLabel,Checkbox } from "@mui/material";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { clearUserState, updateUser } from "../features/userSlice";
import { useAppDispatch,useAppSelector } from "../app/hooks";
import ErrorMsg from "../components/error";
import { useToasts } from "react-toast-notifications";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { User } from "../interfaces/User";
import "../styles/_mainform.scss"



const EditUserPage = () =>{
    const {userId} = useParams()
    const {isError,isSuccess,errorMsg,isLoading,successMsg,allUsers} = useAppSelector((state)=>state.user)
    const currentUser = allUsers?.filter((ele:User)=>ele.id==userId)[0]
    const navigate = useNavigate()
    const dispatch  = useAppDispatch();
    const { addToast:notify } = useToasts()
    const [isAdmin,setIsAdmin] = useState<boolean>(currentUser?.isAdmin)
        


    useEffect(()=>{
         dispatch(clearUserState())
        if(isSuccess){
            notify(`${successMsg}`,{
                appearance: 'success',
                autoDismiss:true
            })
            navigate(-1)
        }
       
    },[isSuccess])
    
    const handleAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAdmin(event.target.checked);
    };

   const onsubmit = (values:{name:string,email:string}) =>{
      dispatch(updateUser({
        userId,
        data:{...currentUser,...values,isAdmin}
      }))
   }

    const userSchema = () =>{
        const schema = Yup.object().shape({
          name:Yup.string().min(2, 'Too Short!').required("Required"),
          email:Yup.string().email("email must be like this example@gmail.com").required("Required"),
        })
        return schema
    }


    return(
        <Stack direction="row" justifyContent="center">
            <Stack direction="column" sx={{width: "570px",maxWidth:"570px",minWidth:"300px"}}>
                <Typography mb={2} sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                    Update User
                </Typography>
                <Formik 
                    initialValues={{
                        name:`${currentUser.name}`,
                        email:`${currentUser.email}`,
                    }}
                    onSubmit={onsubmit}
                    validationSchema={userSchema}
                >
                    <Form className="form-fields">
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
                        <Stack width="100%" justifyContent="flex-start">
                            <FormControlLabel 
                                label="Is Admin"
                                control={
                                    <Checkbox 
                                        disableFocusRipple
                                        disableRipple
                                        checked={isAdmin}
                                        onChange={handleAdminChange}
                                    />
                                } 
                            />
                        </Stack>
                        
                        <div className="submitAndredirect">
                            <button className="submit" type="submit">
                                {
                                    isLoading?
                                    <CircularProgress style={{width:"35px",height:"35px"}} color="inherit" />
                                    :
                                    <span>Update</span>
                                }
                            </button>
                        </div>
                    </Form>
                </Formik>
            </Stack>
        </Stack>
    )
}
export default EditUserPage;