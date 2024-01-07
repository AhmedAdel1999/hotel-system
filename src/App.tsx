import { BrowserRouter,Routes,Route } from "react-router-dom"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Stack } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/navbar/navbar';
import ProtectedRoute from "./components/routes/protectedroute";
import OnlyAdmin from "./components/routes/onlyAdmin";
import HomeScreen from './pages/homePage';
import SingleRoomScreen from "./pages/singleroompage";
import LoginComponent from "./components/authComponents/login";
import RegisterComponent from "./components/authComponents/register";
import CreateRoomPage from "./pages/admincreateroompage";
import AllRooms from "./pages/allroomspage";
import AllUsers from "./pages/alluserspage";
import AllBookings from "./pages/allbookingspage";
import UserProfile from "./pages/userprofilepage";
import EditUserPage from "./pages/adminedituserpage";
import AdminEditRoomPage from "./pages/admineditroompage";
import './App.scss';






function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#593196"
      }
    }
  })

  return (
    <div className="App">
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={theme}>
                <Navbar />
                <Stack sx={{flexBasis:"100%"}}  px={10} py={4}>
                  <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/singleroom/:id" element={<SingleRoomScreen />} />

                    <Route path="/mybookings" element={<ProtectedRoute />}>
                      <Route path="/mybookings" element={<AllBookings ownbooking={true} />}/>
                    </Route>

                    <Route path="/profile" element={<ProtectedRoute />}>
                      <Route path="/profile" element={<UserProfile />}/>
                    </Route>

                    <Route path="/allrooms" element={<OnlyAdmin />}>
                      <Route path="/allrooms" element={<AllRooms />}/>
                    </Route>

                    <Route path="/allusers" element={<OnlyAdmin />}>
                      <Route path="/allusers" element={<AllUsers />}/>
                    </Route>

                    <Route path="/allbookings" element={<OnlyAdmin />}>
                      <Route path="/allbookings" element={<AllBookings />}/>
                    </Route>

                    <Route path="/adminbookings" element={<OnlyAdmin />}>
                      <Route path="/adminbookings" element={<AllBookings ownbooking={true} />}/>
                    </Route>

                    <Route path="/edituser/:userId" element={<OnlyAdmin />}>
                      <Route path="/edituser/:userId" element={<EditUserPage />}/>
                    </Route>

                    <Route path="/createroom" element={<OnlyAdmin />}>
                      <Route path="/createroom" element={<CreateRoomPage />}/>
                    </Route>

                    <Route path="/editroom/:roomId" element={<OnlyAdmin />}>
                      <Route path="/editroom/:roomId" element={<AdminEditRoomPage />}/>
                    </Route>

                  </Routes>
                </Stack>
            </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
