import React from 'react';
import Pagination from '@mui/material/Pagination';

type RoomsPaginationProps={
    numOfPages:number,
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}

const MainPagination = ({numOfPages,setCurrentPage}:RoomsPaginationProps) =>{
    return(
        <Pagination
            count={numOfPages}
            shape='rounded'
            size="large"
            color='primary'
            onChange={(e,page)=>setCurrentPage(page)}
        />
    )
}
export default MainPagination;