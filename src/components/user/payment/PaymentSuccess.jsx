import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import paymentImg from '../../../assets/payment.png'



function PaymentSuccess() {
  return (

    // <Container maxWidth="xl" sx={{backgroundColor:'whitesmoke'}}>
    // {/* <Grid mt={'20rem'}>
    //   <CheckCircleOutlineIcon color="success" fontSize="large" />
    //   <Typography variant="h4" color="success">
    //     Payment Successful
    //   </Typography>
    //   <Typography variant="body1">Thank you for your purchase!</Typography>

    //   <Button
    //     variant="contained"
    //     color="primary"
    //     component={Link}
    //     to="/user/home"
    //     style={{ marginTop: '20px' }}
    //   >
    //     Back to Home
    //   </Button>
    // </Grid> */}
    <Grid display='flex' justifyContent={'center'} height={'100vh'} alignItems={'center'} sx={{ backgroundColor: 'whitesmoke' }}>
      <Grid width={'470px'} height={'450px'} sx={{ backgroundColor: 'white' }} borderRadius={3} display='flex' justifyContent={'center'} alignItems={'center'}>
        <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'}>
          <Grid display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <Grid  display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <CheckCircleOutlineIcon color="success" fontSize="large" />
              <Typography variant="h4" color="success">
                Payment Successful
              </Typography>
              <Typography variant="body1"> Thank you for choosing our services!</Typography>
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

            <Grid container width={'550px'} display={'flex'} justifyContent="center" >

              <Grid item>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'lightblue', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'whitesmoke' }}>
                  {/* First circle */}
                </div>
              </Grid>
              <Grid item width={'435px'}>
                <Divider flexItem variant="middle" />
              </Grid>
              <Grid item>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'lightblue', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'whitesmoke' }}>
                  {/* Second circle */}
                </div>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
      <Grid display={'flex'} justifyContent={'start'} ml={6}>
        <img src={paymentImg} alt="" style={{ width: '220px', height: '350px', ml: '7rem' }} />
      </Grid>
    </Grid>
    // </Container>

  )
}

export default PaymentSuccess
