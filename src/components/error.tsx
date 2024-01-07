import { Alert } from "@mui/material";

type Error={
    msg:string
}
const ErrorMsg = ({msg}:Error) =>{
    return(
        <Alert severity="error">{msg}</Alert>
    )
}
export default ErrorMsg