import React from 'react'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import PatientDetails from '../../../components/doctorHomeNav/doctor-patients/PatientDetails'
import { Grid } from '@mui/material'

function DoctorOnlineAppointments() {
  return (
    <Grid>
      <Grid><DoctorNavBar /></Grid>
      <Grid className='flex'>
        <Grid>
        <DoctorSideNav/>
        </Grid>
        <Grid className='flex-1 mt-4 ml-2 mr-3'><PatientDetails/> </Grid>
      </Grid>
    </Grid>
  )
}

export default DoctorOnlineAppointments