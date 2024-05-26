import React,{useState} from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {AppBar,Toolbar,Typography,Stack,IconButton,Drawer, Button,Menu,MenuItem, Box} from '@mui/material'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faBars, faBookmark, faCaretDown, faHouse, 
faPersonShelter, faRightFromBracket, faRightToBracket, faTimes, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/userSlice";
import defaultImg from "../../assets/user-default.jpg";
import logo from "../../assets/logo.png"
import "./navbar.scss"


const Navbar:React.FC = () =>{

    const theme = useTheme();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isToggle = useMediaQuery(theme.breakpoints.down('lg'));
    const isFull = useMediaQuery('(max-width:400px)');
    const [isDrawerOpen,setIsDrawerOpen] = useState(false)
    const {userInfo} = useAppSelector((state)=>state.user)
    const [anchorEl, setAnchorEl] = useState<any | null >(null)
    const open = Boolean(anchorEl)

    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
      setAnchorEl(null)
      setIsDrawerOpen(false)
    }

    const handleLogout = () =>{
        dispatch(logout())
        setIsDrawerOpen(false)
        navigate("/",{replace:true})
    }
    const routes = () =>{
        if(Object.keys(userInfo).length >0){
            if(userInfo?.isAdmin){
                return(
                    <>
                        <NavLink onClick={()=>setIsDrawerOpen(false)} to="/">
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Home</span>
                        </NavLink>
                        <NavLink onClick={()=>setIsDrawerOpen(false)} to="/allbookings">
                            <FontAwesomeIcon icon={faBookmark} />
                            <span>Bookings</span>
                        </NavLink>
                        <NavLink onClick={()=>setIsDrawerOpen(false)} to="/allrooms">
                            <FontAwesomeIcon icon={faPersonShelter} />
                            <span>Rooms</span>
                        </NavLink>
                        <NavLink onClick={()=>setIsDrawerOpen(false)} to="/allusers">
                            <FontAwesomeIcon icon={faUsers} />
                            <span>Users</span>
                        </NavLink>
                        <Button onClick={handleLogout}  className="btn-route">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span>logout</span>
                        </Button> 
                        <Button
                            id='resources-button'
                            className="btn-route"
                            disableRipple
                            disableElevation
                            onClick={handleClick}
                            >
                                <img 
                                    alt="img" 
                                    src={userInfo?.avatar?userInfo.avatar:defaultImg}
                                />
                                <span>Admin</span>
                                <FontAwesomeIcon icon={faCaretDown} />
                        </Button>
                        <Menu
                            id='resources-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'resources-button'
                            }}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center'
                            }}
                            >
                            <MenuItem onClick={handleClose}>
                                <NavLink to="/adminbookings">MY Bookings</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <NavLink to="/profile">Profile</NavLink>
                            </MenuItem>
                        </Menu>
                        
                    </>
                )
            }else{
                return(
                    <>
                        <NavLink onClick={()=>setIsDrawerOpen(false)} to="/">
                            <FontAwesomeIcon icon={faHouse} />
                            <span>Home</span>
                        </NavLink>
                        <NavLink onClick={()=>setIsDrawerOpen(false)} to="/mybookings">
                            <FontAwesomeIcon icon={faBookmark} />
                            <span>My Bookings</span>
                        </NavLink>
                        <Button className="btn-route" onClick={handleLogout}>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <span>logout</span>
                        </Button> 
                        <NavLink onClick={()=>setIsDrawerOpen(false)} to="/profile">
                            <img 
                                alt="img" 
                                src={userInfo?.avatar?userInfo.avatar:defaultImg} 
                             />
                        </NavLink>
                    </>
                )
            }
        }else{
            return(
                <>
                    <NavLink onClick={()=>setIsDrawerOpen(false)} to="/">
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink onClick={()=>setIsDrawerOpen(false)} to="/login">
                        <FontAwesomeIcon icon={faRightToBracket} />
                        <span>Login</span>
                    </NavLink>
                    <NavLink onClick={()=>setIsDrawerOpen(false)} to="/register">
                        <FontAwesomeIcon icon={faAddressCard} />
                        <span>Register</span>
                    </NavLink> 
                </>
            )
        }
        
    }
    return(
      <AppBar position='sticky' className="navbar">
        <Toolbar className="main-container">   
            <Box sx={{width:"80px",height:"80px"}}>
                <img 
                  src={logo}
                  loading="lazy"
                  alt="logo-img"
                  style={{width:"100%",height:"100%"}}
                />
            </Box>
            {
                isToggle?
                <IconButton 
                  color="inherit" 
                  className="toggle-btn"
                  disableRipple
                  onClick={()=>setIsDrawerOpen(true)}
                >
                    <FontAwesomeIcon icon={faBars} />
                </IconButton>
                :
                <Stack direction='row' className="nav-routes" spacing={3}>
                    {routes()}
                </Stack>

            }
            <Drawer
                anchor='left'
                open={isToggle?isDrawerOpen:false}
                onClose={() => setIsDrawerOpen(false)}
                >
                <Stack flexDirection="row" justifyContent="flex-end">
                    <IconButton 
                    color="inherit" 
                    disableRipple
                    onClick={()=>setIsDrawerOpen(false)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </IconButton>
                </Stack>
                <Stack
                    className={`sidebar nav-routes ${isFull&&'full-width'}`} 
                    direction="column"
                >
                    {routes()} 
                </Stack>
            </Drawer>
        </Toolbar>
      </AppBar>
    )
}
export default Navbar