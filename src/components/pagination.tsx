import React from 'react';
import Pagination from '@mui/material/Pagination';

type RoomsPaginationProps={
    numOfPages:number,
    currentPage:number
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}

const MainPagination = ({numOfPages,currentPage,setCurrentPage}:RoomsPaginationProps) =>{
    return(
        <Pagination
            count={numOfPages}
            shape='rounded'
            size="large"
            color='primary'
            page={currentPage}
            onChange={(e,page)=>setCurrentPage(page)}
        />
    )
}
export default MainPagination;