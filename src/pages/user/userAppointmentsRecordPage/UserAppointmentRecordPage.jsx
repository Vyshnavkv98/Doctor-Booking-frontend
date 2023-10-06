import React from 'react'
import AppointmentRecordTable from '../../../components/user/appointmentTable/AppointmentRecordTable'
import { Box, Grid } from '@mui/material'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import Footer from '../../../components/user/footer/Footer'
import { useState } from 'react'

function UserAppointmentRecordPage() {

    const[open,setOpen]=useState(true)
    const handleSidenav=(val)=>{
          setOpen(val)
    }
  return (
    <Box display={'flex'} flexDirection={'column'} >

    <Grid position={'fixed'} width={'100%'} zIndex={1}>
        <TopNavBar />
    </Grid>

    <Grid display={'flex'}>
        <Grid position={'fixed'} mt={'6rem'} >
            <SideNavBar handleSidenav={handleSidenav} />
        </Grid>
       {open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'22rem'} marginTop={'7rem'}>
            <Grid minHeight={'54vh'}><AppointmentRecordTable/></Grid>
            <Grid mt={3}><Footer /></Grid>
        </Grid>}
       {!open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'8rem'} marginTop={'7rem'}>
       <Grid minHeight={'54vh'}><AppointmentRecordTable/></Grid>
            <Grid mt={3}><Footer /></Grid>
        </Grid>}
        

    </Grid>

    

</Box>
  )
}

export default UserAppointmentRecordPage
