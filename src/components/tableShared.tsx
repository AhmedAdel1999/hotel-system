import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Alert} from '@mui/material';

type TableSharedType<T,S> = {
    tableHeader:T[],
    tableRow:S[]
}
const TableShared = <T extends {name:string} ,S extends object>({tableHeader,tableRow}:TableSharedType<T,S>) =>{
    return tableRow.length?
        (
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {
                                tableHeader.map((ele)=>{
                                    return(
                                        <TableCell 
                                        sx={{
                                            whiteSpace:"nowrap",
                                            textTransform:"capitalize",
                                            fontWeight:"bold",
                                            paddingY:"10px",
                                            '&:not(:last-child)':{
                                                borderRight:"1px solid #ddd",
                                            }
                                        }}
                                        >
                                            {ele.name}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRow.map((row) => (
                        <TableRow
                        >
                            {
                                Object.entries(row).map((ele)=>{
                                    return(
                                        <TableCell 
                                            sx={{
                                                '&:not(:last-child)':{
                                                borderRight:"1px solid #ddd",
                                            },
                                            whiteSpace:"nowrap",
                                            paddingY:"7px",
                                        }}>
                                            {ele[1]}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
        :
        (
            <Alert sx={{width:"fit-content"}}  severity="warning">There Is No Items To Veiwed</Alert>
        )
        
}

export default TableShared;