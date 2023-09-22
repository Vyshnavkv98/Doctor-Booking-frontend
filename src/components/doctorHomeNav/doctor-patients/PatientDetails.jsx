import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box, Button } from '@mui/material';
import bg1 from '../../../assets/doctor.jpg'
import { MarginOutlined } from '@mui/icons-material';
import axios from '../../../axios/axios'
import ConfirmationModal from '../../modal/ConfirmationModal'
import { toast } from 'react-toastify';

export default function PatientDetails(props) {
  const [appointments,setAppointments]=React.useState(null)
  const [modalOpen,setModalOpen]=React.useState(false)
  const [status,setStatus]=React.useState(false)
  const [id,setId]=React.useState(false)

  const { post } = props;
  

  React.useEffect(()=>{
   (async()=>{
    const res=await axios.get('/get-appointments')
    if(res.status===200){
      setAppointments([...res.data.appointments])
    }
   })()
  },[])

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirm=async()=>{
     const res=await axios.post("/confirm-video-consultation-appointment",{status:'confirmed',id:id})
     if(res.status==200){
      setStatus(true)
    toast.success('updated successfully',{
      position:toast.POSITION.TOP_CENTER,
      autoClose:3000
    })
     }
  }

  return (
    <Grid item xs={12} md={6} sx={{ height: 60 }} width={'100%'} display={'flex'} justifyContent={'center'} mt={2}>
      {appointments && appointments.map((appointment,index)=>(
      <CardActionArea key={index} component="a" href="#" sx={{width:'85%'}} >
        <Card sx={{ display: 'flex' }}>
           
           
       
          <Box
            sx={{
              width: '12%', 
              height: '7%', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'baseline',
              m: 2,
              p:4, 
              backgroundColor: '#F0F5F5', 
              borderRadius: 4, 
            }}
          >
             
            <Typography component="h1" variant="h4" color="text.primary" sx={{font:'bold',ml:2}}>
            {appointment.date.split(',')[1]}
            </Typography>
            <Typography variant="h6" color="text.secondary">
             {appointment.date.slice(0,3)}
            </Typography>
          </Box>


          <CardContent sx={{ flex: 1,display:'flex',flexDirection:'column',justifyContent:'center' }}>
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
          <Button variant='outlined' onClick={()=>{return setModalOpen(true),setId(appointment._id)}}>Confirm</Button>
        {/* :<Button variant='outlined' onClick={()=>{return setModalOpen(true),setId(appointment._id)}}>Call</Button>} */}
        <ConfirmationModal open={modalOpen} onClose={closeModal} onConfirm={()=>handleConfirm()} />
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