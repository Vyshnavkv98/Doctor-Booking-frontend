import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TopNavBar from '../../../components/topNavBar/TopNavBar'
import SideNavBar from '../../../components/sidenavbar/SideNavBar'
import FindDoctorVideoConsultation from '../../../components/user/videoConsultation/FindDoctorVideoConsultation'
import Footer from '../../../components/user/footer/Footer'
import DoctorListVideoChat from '../../../components/user/doctorList/DoctorListVideoChat'
import axios from '../../../axios/axios'
import { useLocation } from 'react-router-dom'


function DoctorListVideo() {
    const [open, setOpen] = useState(true)
    const [doctor, setDoctors] = useState([])
    const [department, setDepartment] = useState([])

    const location = useLocation();
    
    const handleSidenav = (val) => {
        setOpen(val)
    }

    useEffect(() => {
        (async () => {
            try {
                const doctors = await axios.post('/getall-doctors');
                const doctorData=doctors.data.filter((doc)=>{
                  return  (doc?.videoConsultationSlots && doc?.Specialization==department)

                })
                setDoctors([...doctorData ])
            } catch (error) {
                console.log(error);
            }
        })()
        setDepartment(location.state)
    },[department])

    return (
        <Box display={'flex'} flexDirection={'column'} >

            <Grid position={'fixed'} width={'100%'} zIndex={1}>
                <TopNavBar />
            </Grid>

            <Grid display={'flex'}>
                <Grid position={'fixed'} mt={'6rem'}>
                    <SideNavBar handleSidenav={handleSidenav} />
                </Grid>
                {open && <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'22rem'} marginTop={'7rem'} minHeight={'100vh'}>
                    <DoctorListVideoChat doctors={doctor} />
                    <Grid mt={3}><Footer /></Grid>
                </Grid>}
                {!open && <Grid width={'100%'} mt={2} display={'flex'} flexDirection={'column'} ml={'8rem'} marginTop={'7rem'} minHeight={'100vh'}>
                    <DoctorListVideoChat  doctors={doctor}/>
                    <Grid mt={3}><Footer /></Grid>
                </Grid>}


            </Grid>



        </Box>
    )
}

export default DoctorListVideo
