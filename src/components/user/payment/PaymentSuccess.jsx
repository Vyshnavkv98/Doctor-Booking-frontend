import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


function PaymentSuccess() {
  return (
  
    <Container maxWidth="sm">
    <div className="payment-success">
      <CheckCircleOutlineIcon color="success" fontSize="large" />
      <Typography variant="h4" color="success">
        Payment Successful
      </Typography>
      <Typography variant="body1">Thank you for your purchase!</Typography>
      {/* <Typography variant="body2">Order Number: {orderNumber}</Typography>
      <Typography variant="body2">Total Amount Paid: ${totalAmount}</Typography> */}

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        style={{ marginTop: '20px' }}
      >
        Back to Home
      </Button>
    </div>
  </Container>
   
  )
}

export default PaymentSuccess
