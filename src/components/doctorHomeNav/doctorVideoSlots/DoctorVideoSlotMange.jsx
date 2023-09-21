import { Box, Button, Card, Container, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSelector } from 'react-redux';
import axios from '../../../axios/axios'
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

function DoctorVideoSlotManage() {

  const doctorId = useSelector((state) => state.doctor.doctor?.doctor?._id)

  const time = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "18:00", "18:30", "19:00"]
  const [timeSlots, setTimeSlot] = useState([])
  const [timeSlotsVideo, setTimeSlotVideo] = useState([])
  const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormatedDate] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [videoTimeSlots, setVideoTimeSlots] = useState(null);



  const handleDateChange = async (date) => {
    setRefresh(!refresh);
    setSelectedDate(date);
    const formattedDate = format(date?.$d, 'MMMM,dd,yyyy');
    setFormatedDate(formattedDate);
    fetchSlots(formattedDate);
  };

  useEffect(() => {
    if (selectedDate !== null) {
      setVideoTimeSlots(null)
      const formattedDate = format(selectedDate?.$d, 'MMMM,dd,yyyy');
      setFormatedDate(formattedDate);
      fetchSlots(formattedDate);


    }
  }, [selectedDate]);

  const fetchSlots = async (date) => {
    try {
      const res = await axios.post("/get-slots", { doctorId });
      const slots = res.data.slotsData;
      for (let i = 0; i < slots.length; i++) {
        if (slots[i]['date'] === date) {
          setTimeSlot([...slots[i]['slots']]);
          if (timeSlots) {
            let videoTime = time.filter((times) => {
              return timeSlots.indexOf(times) === -1

            })
            // console.log(videoTime);
            if (videoTime) {
              setVideoTimeSlots([...videoTime]);
              console.log(videoTimeSlots);
            const ind = [];
            videoTimeSlots.forEach((slot) => {
              return ind.push(time.indexOf(slot));
            });
            setSelectedButtonIndices([...ind]);
            console.log(selectedButtonIndices);
          }
        }
        }

      }
    } catch (error) {
      console.log(error);
    }
  };




  const slotDetails = { timeSlotsVideo, formattedDate, doctorId }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedSlots = await axios.post('/add-videoslots', slotDetails)
    if (updatedSlots) {
      toast.success(updatedSlots.data.message, {
        position: toast.POSITION.TOP_CENTER
      })
    }

  }


  const style = {
    margin: '0.5rem',
    width: '150px',
  };

  const style1 = {
    ...style,
    borderColor: 'red',
    color: 'red',
  };
  const handleButton = (index, time) => {

    if (selectedButtonIndices.includes(index)) {
      setSelectedButtonIndices(
        selectedButtonIndices.filter((i) => i !== index)
      );
    } else {
      setSelectedButtonIndices([...selectedButtonIndices, index]);
    }

    if (timeSlotsVideo.includes(time)) {
      setTimeSlotVideo(
        timeSlotsVideo.filter((i) => i !== time)
      );
    } else {
      setTimeSlotVideo([...timeSlotsVideo, time]);
    }
  }


  const tomorrow = dayjs().add(1, 'day');


  return (

    <Grid container item xs={12} lg={12} md={12}>

      <Container maxWidth="xl">

        <Box p={2}>


          <Grid display={'flex'} alignContent={'space-between'}>
            <Grid>
              <Grid display={'flex'} justifyContent={'space-between'}>
                <Typography>Morning</Typography>
                <LocalizationProvider className='w-100' dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker minDate={tomorrow} value={selectedDate} onChange={(e) => handleDateChange(e)} />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              {videoTimeSlots &&
                <Box display={'flex'} sx={{ display: 'block' }} flexWrap={'wrap'} margin={3}>
                  {videoTimeSlots.map((times, index) => (
                    <Button
                      key={times}
                      sx={
                        selectedButtonIndices.includes(index)
                          ? style1
                          : style
                      }
                      variant='outlined'
                      onClick={() => handleButton(index, times)}
                    >
                      {times}
                    </Button>
                  ))}
                </Box>}
              {!videoTimeSlots &&
                <Box display={'flex'} sx={{ display: 'block' }} flexWrap={'wrap'} margin={3}>
                  {time.map((times, index) => (
                    <Button
                      key={times}
                      sx={
                         style
                      }
                      variant='outlined'
                      onClick={() => handleButton(index, times)}
                    >
                      {times}
                    </Button>
                  ))}
                </Box>}
              <Grid display={'flex'} justifyContent={'end'}>
                {timeSlots && <Button onClick={(e) => handleSubmit(e)} sx={{ width: '6rem', height: '2.5rem' }} type='submit' variant='contained'>Confirm</Button>}
                {!timeSlots && <Button sx={{ width: '6rem', height: '2.5rem' }} variant='contained'>Confirm</Button>}

              </Grid>
            </Grid>
            <Grid alignContent={'end'}>
            </Grid>

          </Grid>


        </Box>



      </Container>

    </Grid>

  )
}

export default DoctorVideoSlotManage
