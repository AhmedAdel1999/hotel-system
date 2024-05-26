import { Button, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
    const navigate = useNavigate()

    return(
        <Stack sx={{justifyContent:"center",alignItems:"center",flexBasis:"100%",gap:"20px"}}>
            <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                404 Page Not Found
            </Typography>
            <Button
             disableElevation
             disableRipple
             variant='contained' 
             color="primary" 
             size='medium'
             onClick={()=>navigate(-1)}
            >
                Go Back
            </Button>
        </Stack>
    )
}
export default PageNotFound