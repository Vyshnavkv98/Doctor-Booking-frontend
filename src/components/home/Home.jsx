import React from 'react'

import SideNavBar from '../sidenavbar/SideNavBar'
import AddFileButton from '../addFile/AddFileButton'
import AddFolder from '../addFile/AddFolder'
import TopNavBar from '../topNavBar/TopNavBar'
import UserHome from '../user/UserHome'
import { Box, Grid } from '@mui/material'
import Footer from '../user/footer/Footer'
import { useState } from 'react'

function Home() {
  const[open,setOpen]=useState(true)
  const handleSidenav = (val) => {
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
               
                <Grid width={'100%'} height={'100vh'} mt={2} display={'flex'} flexDirection={'column'} ml={open?'22rem':'8rem'} marginTop={'7rem'}>
                    <UserHome />
                    <Grid ><Footer /></Grid>
                </Grid>
            </Grid>
        </Box>



  )
}

export default Home
