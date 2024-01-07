import React from "react";
import {Grid,FormGroup,TextField,Typography,Select,MenuItem} from '@mui/material';
import "./searchroom.scss"

type searchRoomProps = {
    setNumOfBeds:React.Dispatch<React.SetStateAction<string|number>>,
    setRoomType:React.Dispatch<React.SetStateAction<string>>,
    setSearch:React.Dispatch<React.SetStateAction<string>>,
    numOfBeds:string|number,
    roomType:string
}
const SearchRoom = ({setNumOfBeds,setRoomType,setSearch,numOfBeds,roomType}:searchRoomProps) =>{
    return(
        <FormGroup className="formcomponent">
            <Grid container columnSpacing={4} rowSpacing={0.5}>
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" gutterBottom>
                       Search
                    </Typography>
                    <TextField
                        className="searchinput"
                        placeholder='Search'
                        variant="outlined"
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" gutterBottom>
                       Num of Beds
                    </Typography>
                    <Select
                        className="selectbox"
                        fullWidth
                        value={numOfBeds}
                        onChange={(e)=>setNumOfBeds(e.target.value)}
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1" gutterBottom>
                        Room Type
                    </Typography>
                    <Select
                        className="selectbox"
                        fullWidth
                        value={roomType}
                        onChange={(e)=>setRoomType(e.target.value)}
                    >
                        <MenuItem value="King">King</MenuItem>
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Twins">Twins</MenuItem>
                    </Select>
                </Grid>
            </Grid>
            
        </FormGroup>
    )
}
export default SearchRoom;