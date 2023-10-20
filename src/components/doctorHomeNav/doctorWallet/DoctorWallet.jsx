import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../../axios/axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';



function DoctorWallet(props) {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        setAppointments([...props.appointments])
    }, [])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleDelete = useCallback((row) => {
        // Implement your delete logic here
        console.log('Deleting:', row);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Grid width={'100%'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} bgcolor={'whitesmoke'}>
            <Grid width={'90%'} height={'90vh'} m={2} display={'flex'} justifyContent={'center'} alignItems={'center'} bgcolor={'white'} borderRadius={5}>
                <Grid width={'96%'} height={'95%'} display={'flex'} justifyContent={'center'} alignItems={'center'} bgcolor={'whitesmoke'} borderRadius={5}>
                    <Grid width={'96%'} height={'95%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} borderRadius={5}>
                        <Paper sx={{ width: '97%', height: '5rem', m: '2px', backgroundColor: 'blue' }}>
                            <Typography variant='h4' fontWeight={600} color={'white'} ml={'2rem'}>Wallet</Typography>
                        </Paper>
                        <Grid display={'flex'} bgcolor={'white'} width={'97%'} justifyContent={'center'} alignItems={'center'} mt={1} gap={3}>
                            <Paper sx={{ width: '65%', height: '6rem', mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                                <Grid ml={5}>
                                    <Grid>
                                        <Typography fontSize={18} varient={'subtitle1'}>Current amount</Typography>
                                    </Grid>
                                    <Grid display={'flex'}>
                                        <AccountBalanceWalletIcon sx={{ fontSize: '2rem' }} />
                                        <Typography fontSize={'2rem'} ml={'1rem'}>₹ </Typography>
                                    </Grid>
                                </Grid>
                                <Grid display={'flex'} alignItems={'center'} mr={2}>
                                    <Button variant='contained'>Withdraw</Button>
                                </Grid>
                            </Paper>
                            <Paper sx={{ width: '35%', height: '6rem', mt: 1, mb: 1 }}>

                            </Paper>
                        </Grid>
                        <Paper sx={{ width: '97%', height: '50rem', m: '2px', mt: 1, borderRadius: 2 }}>
                            <TableContainer sx={{minHeight:'40vh', bgcolor: 'rgba(255,255,255,0.6)' }}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">image</TableCell>
                                            <TableCell align="right">name&nbsp;</TableCell>
                                            <TableCell align="right">email&nbsp;</TableCell>
                                            <TableCell align="right">amount&nbsp;</TableCell>
                                            <TableCell align="right">status&nbsp;</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, mt: 3 }}
                                            >
                                                <TableCell align="right">
                                                    <Avatar
                                                        variant="rounded"
                                                        sx={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                                                        src={`${row.user.profileImg}`}
                                                        alt=""
                                                    />
                                                </TableCell>
                                                <TableCell align="right">{row.name}</TableCell>
                                                <TableCell align="right">{row.user.email}</TableCell>
                                                <TableCell align="right">{row.fee * 85 / 100}</TableCell>
                                                <TableCell align="right" sx={{ color: 'green' }}>credited</TableCell>
                                                {/* <TableCell align="right">
                                        <Button variant='contained' color='warning'>cancel<CancelIcon color='error'/></Button>
                                    </TableCell> */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                // count={appointments.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DoctorWallet
