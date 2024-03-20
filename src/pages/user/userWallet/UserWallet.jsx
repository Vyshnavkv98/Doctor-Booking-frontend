import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Appointment from '../../../components/user/appointmentConfirmation/Appointmentconfirm'
import UserWalletComponent from '../../../components/user/userWallet/UserWalletComponent'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import DoctorWallet from '../../../components/doctorHomeNav/doctorWallet/DoctorWallet'
import axios from '../../../axios/axios'
import Footer from '../../../components/user/footer/Footer'


function UserWallet() {
const [appointments,setAppointments]=useState([])

const[open,setOpen]=useState(true)
const handleSidenav=(val)=>{
      setOpen(val)
}

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/user-appointments');
                setAppointments([...response.data.appointments.filter((item)=>item.status=='Cancelled')]);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
  
        fetchAppointments();
    }, []);

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
       <UserWalletComponent appointments={appointments} />
            <Grid mt={3}><Footer /></Grid>
        </Grid>}
       {!open &&  <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'8rem'} marginTop={'7rem'}>
            <UserWalletComponent appointments={appointments} />
            <Grid mt={3}><Footer /></Grid>
        </Grid>}
    </Grid>
</Box>
  )
}

export default UserWallet