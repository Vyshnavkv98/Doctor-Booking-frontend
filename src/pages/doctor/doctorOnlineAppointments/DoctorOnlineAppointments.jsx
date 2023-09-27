import React from 'react'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import PatientDetails from '../../../components/doctorHomeNav/doctor-patients/PatientDetails'
import { Grid } from '@mui/material'

function DoctorOnlineAppointments() {
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
        <Grid display={'flex'} width={'100%'}  flexDirection={'column'} justifyContent={'center'}><PatientDetails/> </Grid>
      </Grid>
    </Grid>
  )
}

export default DoctorOnlineAppointments