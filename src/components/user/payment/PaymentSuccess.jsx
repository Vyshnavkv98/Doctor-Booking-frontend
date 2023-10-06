import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function PaymentSuccess() {
  return (
  
    <Container maxWidth="sm">
    <Grid mt={'20rem'}>
      <CheckCircleOutlineIcon color="success" fontSize="large" />
      <Typography variant="h4" color="success">
        Payment Successful
      </Typography>
      <Typography variant="body1">Thank you for your purchase!</Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/user/home"
        style={{ marginTop: '20px' }}
      >
        Back to Home
      </Button>
    </Grid>
  </Container>
   
  )
}

export default PaymentSuccess
