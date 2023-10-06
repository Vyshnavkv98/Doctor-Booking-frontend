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
             height={'95vh'}
             display="flex"
             flexDirection="column"
             ml={open ? '20rem' : '7rem'}
             marginTop="5.5rem"
           >
             <DoctorVideoSlotManage  />
             <Grid mt={3}>
               <Footer />
             </Grid>
           </Grid>
         </Grid>
       </Box>
  )
}

export default DoctorVideoConsultationSlotBooking
