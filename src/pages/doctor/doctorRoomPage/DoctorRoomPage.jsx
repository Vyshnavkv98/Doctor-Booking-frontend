import React, { useState } from 'react'
import { Box, Grid } from '@mui/material'
import Footer from '../../../components/user/footer/Footer'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorRoom from '../../../components/doctorHomeNav/doctorVideoCall/DoctorRoom'


function DoctorRoomPage({value}) {

    const [open, setOpen] = React.useState(true); 
  const handleSidenav = () => {
    setOpen(!open);
  };



  return (
    <Box display="flex" flexDirection="column">
      <Grid item position="fixed" width="100%" zIndex={1}>
        <DoctorNavBar />
      </Grid>

      <Grid container display="flex">
        <Grid item position="fixed" mt="5rem" >
          <DoctorSideNav handleSidenav={handleSidenav} />
        </Grid>
        <Grid
          item
          width="100%"
          display="flex"
          flexDirection="column"
          ml={open ? '7rem' : '25rem'}
          height={'100vh'}
          bgcolor={'black'}
          marginTop="6rem"
        >
          <DoctorRoom value={value}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorRoomPage
