import { Navigate,Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

const ProtectedRoute = () =>{
    const {userInfo} = useAppSelector((state)=>state.user)
    const isAllowed = userInfo.token?true:false
    
    return isAllowed?<Outlet />:<Navigate to="/" replace />
}
export default ProtectedRoute