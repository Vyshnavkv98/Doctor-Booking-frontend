import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide, IconButton, Grid, Link } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
// { open, onClose, onConfirm,id }
const ConfirmaAppointment= ({ open, onClose, onConfirm,id,appointmentData }) => {
  return (
    <Dialog
    open={open}
    onClose={onClose}
    maxWidth="lg"
    fullWidth
    TransitionComponent={Slide}
    transitionDuration={500}
    transitionDirection="down"
    
   
    sx={{display:'flex',flexDirection:'column',justifyContent:'center' ,alignItems:'center',borderRadius:'10px'}}

  >
    <DialogTitle display={'flex'} flexDirection={'column'} fontSize={35} fontWeight={550} ml={20} mr={20}>
      <IconButton color="success"  aria-label="appointment">
        <TaskAltIcon sx={{width:'3.5rem',height:'3.5rem'}}/>
      </IconButton>
      Appointment Booked
    </DialogTitle>
    <Grid>
    <DialogTitle display={'flex'} flexDirection={'column'} fontSize={20}>
     Your Upcoming Appointment:
    </DialogTitle>
    <Grid sx={{width:'100%'}} bgcolor={'#f9f8f8'} display={'flex'} justifyContent={'center'} p={3}>
       <Grid>
        <DialogContentText variant='h6'>
            Patient Name: Vyshnav
        </DialogContentText>
        <DialogContentText variant='h6'>
            Doctor:Dr.{appointmentData.doctor.firstName}
        </DialogContentText>
        <DialogContentText variant='h7' color={'black'} mt={2}>
            Our location:
        </DialogContentText>
       <Grid ml={3} display={'flex'} flexDirection={'column'}>
       <Link>{appointmentData.doctor.AddressLine1}</Link>
       <Link>{appointmentData.doctor.AddressLine2}</Link>
       </Grid>
        <DialogContentText variant='h7' color={'black'} mt={2}>
            Appointment details:
        </DialogContentText>
       <Grid ml={3} display={'flex'} flexDirection={'column'}>
       <Link>{appointmentData.date}</Link>
       <Link>{appointmentData.button}</Link>
       <Link>with vaccine room 1</Link>
       </Grid>
      
       </Grid>
    </Grid>
    <Grid display={'flex'} justifyContent={'center'} p={2}>
    <Button variant="contained" color='success' onClick={() => { onConfirm(); onClose(); }} >
          Confirm
        </Button>
       <Button variant="contained" color="primary" onClick={onClose} sx={{ml:'2rem'}}>
          Cancel
        </Button>
       </Grid>

    </Grid>

    <DialogContent>
      <DialogContentText>Reminder will be sent to you</DialogContentText>
    </DialogContent>
  </Dialog>
  );
};
export default ConfirmaAppointment