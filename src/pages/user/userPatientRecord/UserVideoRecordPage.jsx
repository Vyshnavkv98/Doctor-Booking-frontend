import { Box, Grid } from '@mui/material'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import Footer from '../../../components/user/footer/Footer'
import UserVideoRecord from '../userVideoPatientRecord/UserVideoRecord'
import { useState } from 'react'

function UserVideoRecordPage() {

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
              <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={open?'22rem':'8rem'} marginTop={'7rem'}>
                    <UserVideoRecord />
                    <Grid mt={3}><Footer /></Grid>
                </Grid>             
            </Grid>
        </Box>
    )
}

export default UserVideoRecordPage
