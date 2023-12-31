import React, { useState } from 'react'
import DoctorVideocall from '../../../components/doctorHomeNav/doctorVideoCall/DoctorVideocall'
import { Box, Grid } from '@mui/material'
import Footer from '../../../components/user/footer/Footer'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import { useSelector } from 'react-redux'

function DoctorVideoLandingPage() {
 
    const [open, setOpen] = React.useState(true); 

    const email=useSelector(state=>state.doctor.doctor.doctor.email)
 

  const handleSidenav = () => {
    setOpen(!open);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Grid item position="fixed" width="100%" zIndex={1}>
        <DoctorNavBar />
      </Grid>

      <Grid container display="flex">
        <Grid item position="fixed" mt="5rem" xs={open ? 3 : 1}>
          <DoctorSideNav handleSidenav={handleSidenav} />
        </Grid>

        <Grid
          item
          width="100%"
          display="flex"
          flexDirection="column"
          ml={open ? '7rem' : '25rem'}
          marginTop="6rem"
        >
          <DoctorVideocall email={email} />
          <Grid mt={3}>
            <Footer />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorVideoLandingPage
