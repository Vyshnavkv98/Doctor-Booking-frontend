import React, { useState } from 'react'
import DoctorVideoSlotManage from '../../../components/doctorHomeNav/doctorVideoSlots/DoctorVideoSlotMange'
import { Box, Grid } from '@mui/material'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import Footer from '../../../components/user/footer/Footer'
import DoctorSideNav from '../../../components/doctorHomeNav/doctorSideNav/DoctorSideNav'
import DoctorNavBar from '../../../components/doctorHomeNav/doctorNav/DoctorNavBar'

function DoctorVideoConsultationSlotBooking() {
    const[open,setOpen]=useState(true)
    const handleSidenav=(val)=>{
          setOpen(val)
    }
  return (
    <Box display={'flex'} flexDirection={'column'} >

            <Grid position={'fixed'} width={'100%'} zIndex={1}>
                < DoctorNavBar/>
            </Grid>

            <Grid display={'flex'}>
                <Grid position={'fixed'} mt={'4rem'}>
                    <DoctorSideNav handleSidenav={handleSidenav} />
                </Grid>
               {open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'12rem'} marginTop={'7rem'} >
                    <DoctorVideoSlotManage  />
                    <Grid mt={25}><Footer /></Grid>
                </Grid>}
               {!open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'3rem'} marginTop={'7rem'} >
                    <DoctorVideoSlotManage />
                    <Grid mt={25}><Footer /></Grid>
                </Grid>}
                

            </Grid>

            

        </Box>
  )
}

export default DoctorVideoConsultationSlotBooking
