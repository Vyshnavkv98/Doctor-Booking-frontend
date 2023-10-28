import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button } from '@mui/material';
import bg1 from '../../../assets/doctor.jpg'
import axios from '../../../axios/axios'
import ConfirmationModal from '../../modal/ConfirmationModal'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVideocalldata } from '../../../redux/videocall'
import { useSocket } from '../../../context/SocketProvider';

export default function PatientDetails(props) {
  const dispatch = useDispatch()
  const [appointments, setAppointments] = React.useState(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [cancelModalOpen, setCancelModalOpen] = React.useState(false)
  const [status, setStatus] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [id, setId] = React.useState(false)
  

  const navigate = useNavigate()
const socket=useSocket()
  React.useEffect(() => {
    (async () => {
      const res = await axios.get('/get-appointments')
      if (res.status === 200) {
        setAppointments([...res.data.appointments])
      }
    })()
  }, [refresh])
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const closeCancelModal = () => {
    setCancelModalOpen(false);
  };


  const handleConfirm = async () => {
    const res = await axios.post("/confirm-video-consultation-appointment", { status: 'confirmed', id: id })
    setRefresh(!refresh)
    if (res.status == 200) {
      setStatus(true)
      toast.success('updated successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      })
    }
  }

  const handlePrescription = () => {
    navigate('/doctor-prescription')
  }

  const handleVideocall = (name, email, reason, date, time, mobile, user, _id) => {
    const data = { name, email, reason, date, time, mobile, user, _id }
    dispatch(setVideocalldata(data))
    navigate('/doctor-video-landing')

  }

  const handleCancel = async () => {
    const res = await axios.post("/confirm-video-consultation-appointment", { status: 'Cancelled', id: id })
    setRefresh(!refresh)
    if (res.status == 200) {
      setStatus(true)
      toast.success('updated successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000
      })
    }
  }

  return (
    <Grid item xs={12} md={6} width={'100%'} display={'flex'} flexDirection={'column'} mt={0} alignItems={'center'}>
      {appointments && appointments.map((appointment, index) => (
        <CardActionArea key={index} component="a" href="#" sx={{ width: '85%', marginTop: '0rem' }} >
          <Card sx={{ display: 'flex', marginTop: '1rem' }}>



            <Box
              sx={{
                width: '12%',
                // height: '7%',
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                alignItems: 'start',
                m: 2,
                p: 4,
                backgroundColor: '#F0F5F5',
                borderRadius: 4,
              }}
            >

              <Typography component="h1" variant="h4" color="text.primary" sx={{ font: 'bold', ml: 2 }}>
                {appointment.date.split(',')[1]}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {appointment.date.slice(0, 3)}
              </Typography>
            </Box>


            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography component="h2" variant="h5" fontWeight={550}>
                {appointment.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {appointment.email}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {appointment.time}  {appointment.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Reason:  {appointment.reason}
              </Typography>
            </CardContent>
            <Grid margin={2} display={'flex'} alignItems={'center'} gap={1}>

              {
                appointment.status === "Scheduled" ? (
                  <>
                    <Button variant='outlined' onClick={() => { return setModalOpen(true), setId(appointment._id) }}>Confirm</Button>
                    <Button sx={{ ml: '0.5rem' }} variant='outlined' color='error' onClick={() => { return setCancelModalOpen(true), setId(appointment._id) }}>Cancel</Button>
                  </>
                ) : (
                  <>
                    {appointment.status === "completed" ? (
                      <Button variant='outlined' onClick={() => handlePrescription(appointment._id)}>Prescription</Button>
                    ) : appointment.status === "Cancelled" ? (
                      <Button variant='outlined' disabled>Cancelled</Button>
                    ) : (
                      <Button variant='outlined' onClick={() => { return setModalOpen(true), setId(appointment._id), handleVideocall(appointment.name, appointment.email, appointment.reason, appointment.date, appointment.time, appointment.mobile, appointment.user, appointment._id) }}>Call</Button>
                    )}
                  </>
                )
              }
              <ConfirmationModal open={modalOpen} onClose={closeModal} onConfirm={() => handleConfirm()} />
              <ConfirmationModal open={cancelModalOpen} onClose={closeCancelModal} onConfirm={() => handleCancel()} />

            </Grid>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={bg1}
              alt={'post.imageLabel'}
            />

          </Card>

        </CardActionArea>
      ))}
    </Grid>
  );
}