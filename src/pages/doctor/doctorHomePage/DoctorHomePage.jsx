import React from 'react'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import PatientDetails from '../../../components/doctorHomeNav/doctor-patients/PatientDetails'
import { Box, Grid } from '@mui/material'
import DoctorDashboard from '../../../components/doctorHomeNav/doctorDashboard/DoctorDashboard'
import Footer from '../../../components/user/footer/Footer'

function DoctorHomePage() {
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
      <Grid item position="fixed" mt="2rem" xs={open ? 3 : 1}>
        <DoctorSideNav handleSidenav={handleSidenav} />
      </Grid>

      <Grid
        item  
        width="100%"
        display="flex"
        flexDirection="column"
        ml={open ? '7rem' : '20.5rem'}
      >
        <DoctorDashboard />
        <Grid mt={3}>
          {/* <Footer /> */}
        </Grid>
      </Grid>
    </Grid>
  </Box>
  )
}

export default DoctorHomePage
