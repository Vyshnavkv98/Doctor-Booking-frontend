import { Box, Paper, Grid, Typography, TextField, FormLabel, Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import bimg from '../../../assets/bimg3.png'
import Axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import axios from '../../../axios/axios';

function DoctorPrescription() {
  const [prescription, setPrescription] = useState({})
  const [allPrescription, setAllPrescription] = useState([])

  const videoCallData = useSelector(state => state.videocall.videocalldata)

  const HandleChange = (e) => {
    const { value, name } = e.target

    if (name.trim() === ' ') {
      toast.error(`Can't be the field empty`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
    }
    setPrescription((prev) => ({
      ...prev, [name]: value
    }))
  }



  const handleSetAllPrescription = () => {
    let flag = true
    const exists = allPrescription.some((existingPrescription) => existingPrescription.medicationName === prescription.medicationName);
    if (Object.keys(prescription).length === 0) {
      toast.error(`Can't be the field empty`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
    } else {
      for (let item in prescription) {
        if (item.trim() == ' ') {
          flag = false
          toast.error(`Can't be the field empty`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500
          })
        }
      }
    }


    if (!exists && flag) {
      setAllPrescription((prev) => [...prev, prescription]);
    } else {
      toast.error('Medicine already added', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      })
    }
  };




  const handleDelete = useCallback((row) => {
    const updatedAllPrescription = allPrescription.filter((item) => {
      return item !== row
    })
    setAllPrescription([...updatedAllPrescription])
  }, [allPrescription])


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (allPrescription.length > 0 && Object.keys(prescription).length > 0) {
      const response = await axios.post('/add-prescription', { id: videoCallData._id, allPrescription: allPrescription, prescription: prescription })
      console.log(response);
      if (response.status === 200) {
        toast.success('Prescription added', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        })
      }
    }

  }, [])

  return (
    <Box
      sx={{
        backgroundImage: `url(${bimg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minWidth: '100%',
        minHeight: '115vh',
      }}
      minWidth={'90%'}
      minHeight={'100vh'}
    >
      <Grid display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} >

        <Paper sx={{ bgcolor: 'green', width: '95%', height: '50px', mt: '2rem' }}  >
          <Grid ml={'2rem'}>
            <Typography variant='subtitle1' color={'white'} fontWeight={550} fontSize={'1.5rem'}>
              Prescription
            </Typography>
          </Grid>
        </Paper>
        <Paper sx={{ width: '60%', height: '95vh', bgcolor: 'rgba(0,0,0,0.6)', boxShadow: 2, display: 'flex', mt: '3.5rem', flexDirection: 'column' }} variant='outlined' >

          <Grid item spacing={2} display={'flex'} width={'100%'}>
            <Grid sx={6} md={6} width={'50%'} m={'1rem'} mt={'2.5rem'} >
              <FormLabel sx={{ color: 'white' }}>prescriptionId</FormLabel>
              <TextField placeholder='prescriptionId' label='prescriptionId' sx={{ color: 'black', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px', }} value={videoCallData?._id} disabled></TextField>
            </Grid>
            <Grid sx={6} md={6} width={'50%'} m={'1rem'} mt={'2.5rem'} >
              <FormLabel sx={{ color: 'white' }}>name</FormLabel>
              <TextField label='name' placeholder='name' sx={{ color: 'black', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={videoCallData?.name.toUpperCase()} disabled></TextField>
            </Grid>

          </Grid>
          <FormLabel sx={{ color: 'white', fontSize: '1.5rem', fontWeight: '550', m: '1rem' }}>medications</FormLabel>
          <Grid item spacing={1} xs={12} display={'flex'} width={'100%'}>
            <Grid xs={3} md={6} width={'50%'} m={'1rem'}  >
              <FormLabel sx={{ color: 'white' }}>medicationName</FormLabel>
              <TextField label='medicationName' name='medicationName' sx={{ color: 'white', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={prescription.medicationName} onChange={(e) => HandleChange(e)} ></TextField>
            </Grid>
            <Grid xs={3} md={6} width={'50%'} m={'1rem'}  >
              <FormLabel sx={{ color: 'white' }}>dosage</FormLabel>
              <TextField label='dosage' name='dosage' sx={{ color: 'white', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={prescription.dosage} onChange={(e) => HandleChange(e)}></TextField>
            </Grid>
            <Grid xs={3} md={6} width={'50%'} m={'1rem'}>
              <FormLabel sx={{ color: 'white' }}>frequency</FormLabel>
              <TextField p label='frequency' name='frequency' sx={{ color: 'white', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={prescription.frequency} onChange={(e) => HandleChange(e)}></TextField>
            </Grid>
            <Grid xs={3} md={6} width={'50%'} m={'1rem'}  >
              <FormLabel sx={{ color: 'white' }}>instructions</FormLabel>
              <TextField label='instructions' name='instructions' sx={{ color: 'white', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={prescription.instructions} onChange={(e) => HandleChange(e)}></TextField>
            </Grid>
          </Grid>
          <Grid display={'flex'} justifyContent={'end'} mr={2}>
            <Button variant='contained' color='error' onClick={handleSetAllPrescription}>Add</Button>
          </Grid>
          <Grid m={2} style={{ bgcolor: 'rgba(255,255,255,0.6)' }}>
            {allPrescription.length > 0 &&
              <TableContainer component={Paper} sx={{ height: '150px', bgcolor: 'rgba(255,255,255,0.6)' }} >
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">medicationName</TableCell>
                      <TableCell align="right">dosage&nbsp;</TableCell>
                      <TableCell align="right">frequency&nbsp;</TableCell>
                      <TableCell align="right">instructions&nbsp;</TableCell>
                      <TableCell align="right">actions&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allPrescription.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="right">{row.medicationName}</TableCell>
                        <TableCell align="right">{row.dosage}</TableCell>
                        <TableCell align="right">{row.frequency}</TableCell>
                        <TableCell align="right">{row.instructions}</TableCell>
                        <TableCell align="right"><Box>
                          <DeleteIcon variant="contained" color="secondary" onClick={() => handleDelete(row)} />
                        </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
          </Grid>
          <Grid item xs={12}>
            <Grid xs={12} md={12} m={'1rem'}  >
              <FormLabel sx={{ color: 'white' }}>diagnosis</FormLabel>
              <TextField label='diagnosis' name='diagnosis' sx={{ color: 'white', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={prescription.diagnosis} onChange={(e) => HandleChange(e)}></TextField>
            </Grid>
            <Grid xs={12} md={12} m={'1rem'}  >
              <FormLabel sx={{ color: 'white' }}>notes</FormLabel>
              <TextField label='notes' name='notes' sx={{ color: 'white', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={prescription.notes} onChange={(e) => HandleChange(e)}></TextField>
            </Grid>
            <Grid xs={12} md={12} m={'1rem'} >
              <FormLabel sx={{ color: 'white' }}>nextAppointment</FormLabel>
              <TextField placeholder='eg : 25-12-2023' name='nextAppointment' sx={{ color: 'white', width: '100%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: '10px' }} value={prescription.nextAppointment} onChange={(e) => HandleChange(e)}></TextField>
            </Grid>
          </Grid>
          <Grid>
            <Grid display={'flex'} justifyContent={'center'} m={2}>
              <Button variant='contained' color='success' sx={{ height: '3rem' }} fullWidth type='submit' onClick={(e) => handleSubmit(e)}>Submit</Button>
            </Grid>
          </Grid>
        </Paper>

      </Grid>
    </Box>
  )
}

export default DoctorPrescription
