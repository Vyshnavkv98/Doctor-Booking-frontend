import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import img from '../../../../assets/meeting.gif'
import { useNavigate } from 'react-router-dom'

function DoctorSuccess({ value }) {
    const [countdown, setCountdown] = useState(25)
    const navigate = useNavigate()

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCountdown((prev) => prev - 1)
        }, 250)
        if (countdown === 0) {
            if (value == 'doctor')
                navigate('/doctor-home')
            else {
                navigate('/user/home')
            }
        }

        return () => {
            clearTimeout(timeoutId)
        }
    }, [countdown])


    return (
        <Grid>
            <CircularProgress variant="determinate" value={(countdown / 25) * 100} sx={{ m: '2rem' }}></CircularProgress>
            <Grid display={'flex'} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} >
                <Grid width={'30rem'} display={'flex'} alignItems={'center'} flexDirection={'column'} mt={'13rem'} >
                    <Typography variant='h3' fontSize={30} font fontWeight={600}>
                        You left the meeting
                    </Typography>

                    <Button variant='contained' sx={{ mt: '1rem' }} >Return to home screen</Button>

                    <Grid>
                        <img src={img} alt="" />
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    )
}

export default DoctorSuccess
