import { Navigate,Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"

const ProtectedRoute = () =>{
    const {userInfo} = useAppSelector((state)=>state.user)
    
    return Object.keys(userInfo).length>0?<Outlet />:<Navigate to="/" replace />
}
export default ProtectedRoute