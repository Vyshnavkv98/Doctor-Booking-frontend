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
import { Box, Button, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadButton from '../../../services/DownloadButton';

function AppointmentRecordTable() {
    const [appointments, setAppointments] = useState([]);
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

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/user-video-appointments');
                setAppointments([...response.data.appointments]);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
        console.log(appointments,'from offlirr');
    }, []);

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ width: '90%', overflow: 'hidden', mt: 8 }}>
                <TableContainer component={Paper} sx={{ minHeight: '450px', bgcolor: 'rgba(255,255,255,0.6)' }}>
                    <Table sx={{ }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">appointmentId</TableCell>
                                <TableCell align="right">name&nbsp;</TableCell>
                                <TableCell align="right">doctor&nbsp;</TableCell>
                                <TableCell align="right">date&nbsp;</TableCell>
                                <TableCell align="right">time&nbsp;</TableCell>
                                <TableCell align="right">action&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, mt: 3 }}
                                >
                                    <TableCell align="right">{row._id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">Dr.{row.doctor?.firstName} {row.doctor?.lastName}</TableCell>
                                    <TableCell align="right">{row.time}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">
                                        {/* <DownloadButton /> */}
                                    <CancelIcon color='error' />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={appointments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default AppointmentRecordTable;
