import React, { useState } from 'react'
import DoctorProfile from '../../../components/user/doctorList/DoctorProfile'
import { Box, Grid } from '@mui/material'

import TopNavBar from '../../../components/topNavBar/TopNavBar'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import Footer from '../../../components/user/footer/Footer'

function DoctorProfileUserSide() {
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
        <Grid position={'fixed'} mt={'6rem'}>
            <SideNavBar handleSidenav={handleSidenav} />
        </Grid>
       {open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'22rem'} marginTop={'7rem'}>
            <DoctorProfile />
            <Grid mt={3}><Footer /></Grid>
        </Grid>}
       {!open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'8rem'} marginTop={'7rem'}>
            <DoctorProfile />
            <Grid mt={3}><Footer /></Grid>
        </Grid>}
        

    </Grid>

    

</Box>
  )
}

export default DoctorProfileUserSide
