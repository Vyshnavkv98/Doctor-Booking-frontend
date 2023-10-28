import { Grid, Paper, TableCell, TableHead, Typography } from '@mui/material'
import React from 'react'
import AppointmentLineDiagram from '../../charts/AppointmentLineDiagram'
import Polarchart from '../../charts/Polarchart'
import { Table, TableContainer, TableRow } from '@windmill/react-ui'

function DoctorDashboard() {
  return (
    <Grid  height={'100%'} bgcolor={'black'} mt={8}>
      {/* <Typography variant='h4' m={2} fontWeight={700} color={'white'}>Dashboard</Typography> */}
      <Grid display={'flex'} height={'56%'} mt={5} ml={5} mr={5} >
        <Grid width={'40%'} display={'flex'} flexWrap={'wrap'} m={3} item justifyContent={'end'}>
          <Grid >
            <Grid display={'flex'} width={'100%'}>
              <Paper sx={{ bgcolor: '#17151F', width: '250px', height: '160px', m: '0.2rem', boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Typography color={'white'} fontWeight={600}>Visitors</Typography>
              </Paper>
              <Paper sx={{ bgcolor: '#17151F', width: '250px', height: '160px', m: '0.2rem', boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Typography color={'white'} fontWeight={600}>offline Appontments</Typography>
              </Paper>

            </Grid>
            <Grid display={'flex'}>
              <Paper sx={{ bgcolor: '#17151F', width: '250px', height: '160px', m: '0.2rem', boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Typography color={'white'} fontWeight={600}>Online Appontments</Typography>
              </Paper>
              <Paper sx={{ bgcolor: '#17151F', width: '250px', height: '160px', m: '0.2rem', boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)', borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                <Typography color={'white'} fontWeight={600}>Revenew</Typography>
              </Paper>
            </Grid>
          </Grid>

        </Grid>
        <Grid width={'100%'} height={'325px'} mt={4} mr={4}>
          <Paper
            sx={{
              bgcolor: '#17151F',
              width: '100%', // Set width to 100%
              height: '100%',
              m: '0.2rem',
              boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)',
              borderRadius: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppointmentLineDiagram  />
          </Paper>
        </Grid>
      </Grid>
      <Grid width={'100%'} display={'flex'} >
        {/* <Typography variant='h4' m={2} fontWeight={700} color={'white'}>Dashboard</Typography> */}
        <Grid width={'60%'} height={'325px'} ml={5} mr={2}> 
          <Paper
            sx={{
              bgcolor: '#17151F',
              width: '100%', // Set width to 100%
              height: '100%',
              m: '0.2rem',
              boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)',
              borderRadius: '1rem',
              display: 'flex',
            }}
          >
            <TableContainer component={Paper} sx={{ bgcolor: 'rgba(255,255,255,0.6)' }}>
                    <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell  style={{color:'white'}}>appointmentId</TableCell>
                                <TableCell  style={{color:'white'}}>name&nbsp;</TableCell>
                                <TableCell  style={{color:'white'}}>doctor&nbsp;</TableCell>
                                <TableCell  style={{color:'white'}}>date&nbsp;</TableCell>
                                <TableCell  style={{color:'white'}}>time&nbsp;</TableCell>
                                <TableCell  style={{color:'white'}}>action&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                            {appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, mt: 3 }}
                                >
                                    <TableCell align="right">{row._id}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.time}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">
                                        <Button variant='contained' color='warning'>cancel<CancelIcon color='error'/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody> */}
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={appointments.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
          </Paper>
        </Grid>
        <Grid width={'40%'} height={'325px'} >
        <Paper sx={{ bgcolor: '#17151F', width: '85%', height: '100%', mr:'2rem',ml:'0.2rem', boxShadow: '4px 4px 8px rgba(255, 255, 255, 0.2)', borderRadius: '1rem'}} >
                <Typography color={'white'} fontWeight={600}>Visitors</Typography>
                <Polarchart/>
              </Paper>
        </Grid>
        
      </Grid>

    </Grid>
  )
}

export default DoctorDashboard
