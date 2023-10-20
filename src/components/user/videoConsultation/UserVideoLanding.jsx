import { Grid, Box, Typography, Button, Paper } from '@mui/material'
import React, { useEffect,useState,useCallback } from 'react'
import img from '../../../assets/videocall1.png'
import { useLocation, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {useSocket} from '../../../context/SocketProvider'


function UserVideoLanding(props) {


    const socket=useSocket()
    const [userData, setUserData] = useState(null)

   
    const data= useSelector(state=>state.videocall.videocalldata)  
    

    useEffect(() => {
        setUserData({...data})
    },[])
    const navigate = useNavigate()
    const handleBack = () => {
        navigate(-1)
    }
    const email=props.email
    const room=userData?._id.concat(userData?.user)
    const handleConnect = useCallback(() => {
     socket.emit('Room:join',{email,room})
    },[email,room,socket])

    const handleJoinRoom=useCallback((data)=>{
        const {email,room}=data
        console.log(data);
        navigate(`/user-room/${room}`)
    },[])

    useEffect(()=>{ 
   socket.on("Room:join",handleJoinRoom)
   return ()=>{
    socket.off('Room:join',handleJoinRoom)
    }
    },[socket])
    return (
        <Box sx={{backgroundImage: `url(${img})`, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} display={'flex'}>


            <Grid width={'50%'} height={'100vh'} sx={{ backgroundColor: 'transparent' }} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                <Grid  >
                    <Typography color={'white'} sx={{ fontSize: 45, fontWeight: 800 }}>
                        India's no. 1 doctor
                    </Typography>
                    <Typography color={'white'} sx={{ fontSize: 45, fontWeight: 800 }}>
                        Consultation app
                    </Typography>
                    <Typography color={'white'} sx={{ fontSize: 38, fontWeight: 600 }}>
                        Every right health
                    </Typography>
                    <Typography color={'white'} sx={{ fontSize: 38, fontWeight: 600 }}>
                        Decesion start here
                    </Typography>
                    <Grid display={'flex'} mt={2}>
                        <Button variant='contained' onClick={handleConnect}>Connect now</Button>
                        <Button variant='outlined' sx={{ marginLeft: '2rem', borderColor: 'red', color: 'red' }} onClick={handleBack}>Back</Button>
                    </Grid>

                </Grid>



            </Grid>
        </Box>
    )
}

export default UserVideoLanding
