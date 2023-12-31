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
import ConfirmationModal from '../../../components/modal/ConfirmationModal'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVideocalldata } from '../../../redux/videocall'
import { useSocket } from '../../../context/SocketProvider';
import DownloadButton from '../../../services/DownloadButton';
import { SpinnerCircular, SpinnerRoundOutlined } from 'spinners-react';

export default function UserVideoRecord(props) {
  const dispatch = useDispatch()
  const socket = useSocket()
  const [room, setRoom] = React.useState()
  const [appointments, setAppointments] = React.useState([])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [id, setId] = React.useState(false)
  const [refresh, setRefresh] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const handleCancel = async (appointmentId) => {
    try {
      const response = await axios.post("/cancel-appointment", { appointmentId: appointmentId })
      console.log(response.data.appointmentData);
      if (response.status == 201) {
        setRefresh(!refresh)
        toast.success('Appointment canceled', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        })
      }
    } catch (error) {
      console.log(error);
    }

  }

  const { post } = props;
  const navigate = useNavigate()
  const handleJoinRoom = React.useCallback((data) => {
    // const { email, room } = data;
    console.log('Received data from Room:join event:', data, 'daaata');
    // navigate(`/doctor-room/${room}`);
  }, [socket]);

  React.useEffect(() => {
    console.log('Setting up listener for Room:join event');
    socket.on('Room:join', () => { console.log('haiiii') }, handleJoinRoom);

    return () => {
      console.log('Cleaning up listener for Room:join event');
      socket.off('Room:join', handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  React.useEffect(() => {
    (async () => {
      const res = await axios.get('/user-appointments')
      if (res.status === 200) {
        setAppointments([...res.data.appointments])
      }
      
    })()
    if(appointments.length>0)setIsLoading(false)
  }, [refresh,appointments])
  console.log(appointments, 'from video rec')
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //   const handleConfirm = async () => {
  //     const res = await axios.post("/confirm-video-consultation-appointment", { status: 'confirmed', id: id })
  //     if (res.status == 200) {
  //       setStatus(true)
  //       toast.success('updated successfully', {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 3000
  //       })
  //     }
  //   }

  const handleVideocall = (name, email, reason, date, time, mobile, user, _id) => {
    const data = { name, email, reason, date, time, mobile, user, _id }
    dispatch(setVideocalldata(data))
    navigate('/user-video-landing')
  }



  return (
    <Grid item xs={12} md={6} width={'100%'} display={'flex'} flexDirection={'column'} mt={0} alignItems={'center'}>
      {isLoading ? (<Grid width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'}><SpinnerRoundOutlined size={50} thickness={100} speed={100} color="#36ad47" /></Grid>) :
          (appointments.map((appointment, index) => (
            <CardActionArea key={index} component="a" href="#" sx={{ width: '85%', marginTop: '0rem' }} >
              <Card sx={{ display: 'flex', marginTop: '1rem' }}>
                <Box
                  sx={{
                    width: '12%',
                    // height: '7%',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'start',
                    m: 2,
                    p: 4,
                    backgroundColor: '#F0F5F5',
                    borderRadius: 4,
                  }}
                >

                  <Typography component="h1" variant="h4" color="text.primary" sx={{ font: 'bold', ml: 2 }}>
                    {appointment.date.split(',')[1]}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" ml={2}>
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
                <Grid margin={2} display={'flex'} alignItems={'center'}>
                  {appointment.prescription.length > 0 ? (
                    <DownloadButton appointment={appointment} />
                  ) : appointment.status === 'Cancelled' ? (
                    <Button variant='contained' color='primary' disabled>
                      Canceled
                    </Button>
                  ) : !room ? (
                    <>
                      <Button variant='outlined' onClick={() => handleCancel(appointment._id)}>
                        Cancel
                      </Button>
                      <Button
                        variant='contained'
                        sx={{ ml: '0.5rem' }}
                        color='success'
                        onClick={() => {
                          setModalOpen(true);
                          setId(appointment._id);
                          handleVideocall(
                            appointment.name,
                            appointment.email,
                            appointment.reason,
                            appointment.date,
                            appointment.time,
                            appointment.mobile,
                            appointment.user,
                            appointment._id
                          );
                        }}
                      >
                        Accept
                      </Button>
                    </>
                  ) : null}


                  <ConfirmationModal open={modalOpen} onClose={closeModal} />
                </Grid>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  image={bg1}
                  alt={'post.imageLabel'}
                />

              </Card>

            </CardActionArea>
          ))
          )
      }
    </Grid>
  );
}