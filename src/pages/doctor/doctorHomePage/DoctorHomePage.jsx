import React from 'react'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import PatientDetails from '../../../components/doctorHomeNav/doctor-patients/PatientDetails'
import { Grid } from '@mui/material'

function DoctorHomePage() {
  const [open, setOpen] = React.useState(true);

  const handleSidenav = () => {
    setOpen(!open);
  };
  return (
    <Grid>
      <Grid><DoctorNavBar /></Grid>
      <Grid className='flex'>
        <Grid>
        <DoctorSideNav  handleSidenav={handleSidenav}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DoctorHomePage
