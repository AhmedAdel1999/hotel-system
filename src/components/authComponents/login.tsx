import  { useEffect } from "react";
import { clearUserState, login } from "../../features/userSlice";
import { Formik, Form, Field , ErrorMessage } from 'formik';
import { CircularProgress } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import { useAppDispatch,useAppSelector } from "../../app/hooks";
import { UserLogin } from "../../interfaces/User";
import ErrorMsg from "../../components/error";
import * as Yup from "yup";
import "./auth.scss"


const LoginComponent = () => {

  const dispatch  = useAppDispatch();
  const navigate = useNavigate();
  const {isError,isSuccess,errorMsg,isLoading} = useAppSelector((state)=>state.user)


  useEffect(()=>{
    dispatch(clearUserState())
    if(isSuccess){
      navigate("/")
    }
  },[isSuccess])

  const onSubmit = (values:UserLogin)=>{
    dispatch(login(values)) 
  }

  const schema = () =>{
    const schema = Yup.object().shape({
      email:Yup.string().email("email must be like this example@gmail.com").required("required"),
      password:Yup.string().min(6, 'Too Short!').required("required"),
    })
    return schema
  }

  return (
    <div className="auth">
        <div className="auth-container">

          {
            isError&&
            <ErrorMsg msg={errorMsg} />
          }
          
           <Formik 
            initialValues={{
                email:"admin@gmail.com",
                password:"123456",
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            <Form className="form-fields">

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
                    <span>Login</span>
                  }
                </button>
                <div className="redirect">
                    <span>Do You have account?</span>
                    <span><Link to="/register">Register</Link></span>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
    </div>
  );
}

export default LoginComponent;