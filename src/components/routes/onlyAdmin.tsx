import { Navigate,Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

const OnlyAdmin = () =>{
    const {userInfo} = useAppSelector((state)=>state.user)
    const isAdmin = userInfo?.isAdmin?true:false
    
    return isAdmin?<Outlet />:<Navigate to="/" replace />
}
export default OnlyAdmin