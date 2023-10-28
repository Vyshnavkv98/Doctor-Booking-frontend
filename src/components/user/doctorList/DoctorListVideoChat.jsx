import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import img1 from '../../../assets/img2.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { format } from 'date-fns';

import dayjs from 'dayjs';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import ConfirmaAppointment from '../../modal/ConfirmAppointment';

function DoctorListVideoChat({ doctors }) {
  const [isAppointmentTimeHidden, setAppointmentTimeHidden] = useState(false);
  const [doctorList, setDoctorList] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate()

  const handleDateChange = (date) => {
    const formattedDate = format(date?.$d, 'MMMM, dd, yyyy');
    setSelectedDate(formattedDate)
  }
  const tomorrow = dayjs().add(1, 'day');

  useEffect(() => {
    setDoctorList([...doctors])
  }, [doctors])

  const goToPrevItem = (contentItems, index) => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + contentItems.length) % contentItems.length);
  };

  const goToNextItem = (contentItems, index) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % contentItems.length);
  };

  const handleAppointmentDiv = (index) => {
    setSelectedDoctorIndex(index);
    setAppointmentTimeHidden(true);
  }

  const handleAppointmentDivHidden = (index) => {
    setSelectedDoctorIndex(null);
    setAppointmentTimeHidden(false);
  }

  const handleAppointmentDetails = (time, index, date, id, doctor) => {
    const data = { time, date, id, doctor, video: 'video' }
    navigate('/appointment', { state: data })
  }
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid container item xs={12} lg={12} md={12}>
      <Container maxWidth="xl">
        {doctorList && doctorList.map((doctor, index) => (
          <Box p={2} key={index}>
            <Divider variant='middle' sx={{ marginBottom: '1rem' }} />
            <Grid container display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Grid display={'flex'} flexDirection={'row'}>
                <Grid item>
                  <img src={img1} alt="img" style={{ borderRadius: '100%', width: '10rem', height: '10rem' }} />
                </Grid>
                <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'} spacing={3} padding={2}>
                  <Typography variant='h4' fontWeight={'500'} color={'#189FD8'}>
                    Dr.{doctor?.firstName} {doctor?.lastName}
                  </Typography>
                  <Typography variant='subtitle1' color={'grey'} fontWeight={'500'}>
                    {doctor?.specialization}
                  </Typography>
                  <Typography variant='subtitle2' fontWeight={'500'}>
                    27 years experience
                  </Typography>
                  <Typography variant='subtitle2' fontWeight={'500'}>
                    {doctor?.city}
                  </Typography>
                  <Typography variant='subtitle2' fontWeight={'500'}>
                    ₹{doctor.RegisterFee} Consultation Fees
                  </Typography>
                  <Link href="#" color="inherit" underline="none" style={{ fontSize: '14px', color: '#189FD8' }}>
                    {'view profile'}
                  </Link>
                </Grid>
              </Grid>
              <Grid display={'flex'} alignItems={'end'} >
                <Button variant='contained' sx={{ cursor: 'pointer' }} onClick={() => handleAppointmentDiv(index)}>Book Appointment</Button>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: '1rem' }} variant='middle' />
            {isAppointmentTimeHidden && selectedDoctorIndex === index && (
              <Grid display={'flex'} justifyContent={'space-between'}>
                <Grid>
                  <Button onClick={() => goToPrevItem(doctor?.AvailableSlots, index)} startIcon={<ArrowBack />} >
                    Previous
                  </Button>
                </Grid>
                <Grid>
                  <Button onClick={() => goToNextItem(doctor?.AvailableSlots, index)} endIcon={<ArrowForward />} >
                    Next
                  </Button>
                </Grid>
              </Grid>
            )}
            {isAppointmentTimeHidden && selectedDoctorIndex === index && (
              <Grid display={'flex'} alignContent={'space-between'} width={'100%'}>
                <Grid>
                  <Grid display={'flex'} justifyContent={'space-between'} p={2} >
                    <Typography color={'green'}>{doctor?.videoConsultationSlots[currentIndex]?.date}</Typography>
                  </Grid>
                  <Grid display={'flex'} flexDirection={'column'}>
                    <Grid>
                    <Box display='flex' flexDirection='row' flexWrap='wrap' margin={3}>
  {doctor?.videoConsultationSlots[currentIndex]?.slots.sort().map((button, slotIndex) => (
    <div key={button} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: '1rem' }}>
      <Button
        sx={{ margin: '0.5rem', width: '150px' }}
        onClick={() => setModalOpen(true)}
        variant='outlined'
      >
        {button}
      </Button>
      <ConfirmaAppointment open={modalOpen} onClose={closeModal} onConfirm={() => handleAppointmentDetails(button, slotIndex, doctor?.videoConsultationSlots[currentIndex]?.date, doctor._id, doctor)} appointmentData={{date: doctor?.videoConsultationSlots[currentIndex]?.date,
          doctorId: doctor._id,
          button:button,
        doctor:doctor
        }}
           />
    </div>
  ))}
</Box>



                    </Grid>
                    <Grid alignContent={'end'}>
                      <Link onClick={() => handleAppointmentDivHidden(index)} color="inherit" underline="none" style={{ fontSize: '14px', color: '#189FD8' }} >
                        {'Show less'}
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Box>
        ))}
      </Container>
    </Grid >
  )
}

export default DoctorListVideoChat;
