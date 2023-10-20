import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import ReactPlayer from 'react-player';
import { useSocket } from '../../../context/SocketProvider';
import peer from '../../../services/peer';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../../../axios/axios';

function DoctorRoom({ value }) {
  const [mystream, setMyStream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [callActive, setCallActive] = useState(false)
  const socket = useSocket();

  const navigate=useNavigate()
  const videoCallData= useSelector(state=>state.videocall.videocalldata) 


  const handleCallUsers = useCallback(async () => {
    if (callActive) {
      if (mystream) {
        mystream.getTracks().forEach((track) => {
           track.stop();
        });
      }
       setMyStream(null);
      
      socket.emit('call:end', { to: remoteSocketId })
      setCallActive(false)
      setRemoteStream('')
     
      socket.emit('socket:disconnect', { socketId: remoteSocketId });
      console.log(value,'value');
      const response=await axios.patch('/video-appointment-finished',{id:videoCallData._id})

      if (value == 'doctor') {
        navigate('/doctor-success')
      } else if (value == "user") {
        navigate('/user/video-success')
      }

    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      const offer = await peer.getOffer()
      socket.emit('user:call', { to: remoteSocketId, offer })
      setMyStream(stream)
      setCallActive(true)
    }
  }, [callActive, mystream, remoteSocketId, socket, value,refresh])




  const handleUserJoin = useCallback(({ email, id }) => {
    console.log(`${email} joined in ${id}`);
    setRemoteSocketId(id);
  }, []);

  const handleIncoming = useCallback(async ({ from, offer }) => {
    console.log(`incoming call from ${from}: ${offer}`);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setCallActive(true)
    const answer = await peer.getAnswer(offer);
    socket.emit('call:accepted', { to: from, answer });
  }, [socket]);

  const sendStream = useCallback(() => {
    try {
      for (const track of mystream.getTracks()) {
        peer.peer.addTrack(track, mystream)
        setCallActive(true)
      }
    } catch (error) {
      console.log(error);
    }
  }, [mystream, refresh])

  const handleCallAccepted = useCallback(({ answer, from }) => {
    console.log(`Call accepted from ${from}: ${answer}`);
    peer.setLocalDescription(answer);
    setCallActive(true)
    //  sendStream()
    setRefresh(!refresh)


  }, [sendStream, mystream, refresh]);

  const handleNogotiationneeded = useCallback(async () => {
    const offer = await peer.getOffer()
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
  }, [remoteSocketId, socket, refresh])

  useEffect(() => {
    peer.peer.addEventListener('negotiationneeded', handleNogotiationneeded

    )
    return () => {
      peer.peer.removeEventListener('negotiationneeded', handleNogotiationneeded)

    }
  }, [handleNogotiationneeded])

  useEffect(() => {
    peer.peer.addEventListener('track', async ev => {
      const remotStream = ev.streams
      console.log(remotStream, 'remot stream');
      setRemoteStream(remotStream[0])
    })
  }, [mystream, refresh]) //myStream

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit('user:call', { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket, refresh]);
  const handleNegotiationIncoming = useCallback(async (from, offer) => {
    const answer = await peer.getAnswer(offer);
    socket.emit('peer:nego:done', { to: from, answer });
  }, [socket, refresh]);

  const handleNegotiationFinal = useCallback(async ({ from, answer }) => {
    await peer.setLocalDescription(answer);
  }, [socket, refresh]);
  useEffect(() => {
    socket.on('incoming:call', handleIncoming);
    socket.on('Room:joined', handleUserJoin);
    socket.on('call:accepted', handleCallAccepted);
    socket.on('peer:nego:needed', handleNegotiationIncoming);
    socket.on('peer:nego:final', handleNegotiationFinal);

    return () => {
      socket.off('incoming:call', handleIncoming);
      socket.off('Room:joined', handleUserJoin);
      socket.off('call:accepted', handleCallAccepted);
      socket.off('peer:nego:needed', handleNegotiationIncoming);
      socket.off('peer:nego:final', handleNegotiationFinal);
    };
  }, [socket, handleUserJoin, handleIncoming, handleCallAccepted, handleNegotiationFinal, handleNegotiationIncoming]);

  useEffect(() => {
    handleCallUser();
  }, [handleCallUser]);
  return (
    <Grid bgcolor="black" display={'flex'} flexDirection={'column'} width="100%" height="100%">
      <Grid width="100%" height="100%" >
        {mystream && (
          <ReactPlayer
            playing
            muted
            url={mystream}
            width="20%"
            height="20%"
            style={{ borderRadius: '10px', position: 'absolute', bottom: '5rem', right: '20rem' }}
          />
        )}
      </Grid>
      <Grid width="100%" height="100%">
        {remoteStream && (
          <ReactPlayer

            playing
            muted
            url={remoteStream}
            width="100%"
            height="850px" // Adjust this height to your desired value
          />
        )}
        <Grid width={'100%'}>
          <CallEndIcon fontSize='2rem' color='red' />
        </Grid>
      </Grid>
      {mystream && <Button onClick={() => { return sendStream(), setRefresh(!refresh) }}>Connect</Button>
      }
      <Grid spacing={2} display={'flex'} alignItems={'center'} width={'100%'} justifyContent={'center'} mb={'2rem'}>
        <Grid width={'15%'} display={'flex'} justifyContent={'space-between'}>
          <VideoCameraFrontIcon color='primary' sx={{ fontSize: '2rem', }} />
          <VideocamOffIcon color='error' sx={{ fontSize: '2rem', }} />
         <Button onClick={()=>handleCallUsers()}> <CallEndIcon sx={{ bgcolor: 'red', fontSize: '2.5rem', color: 'white', borderRadius: '50%', }}  /></Button>
          <MicOffIcon color='error' sx={{ fontSize: '2rem', }} />
          <MicIcon color='primary' sx={{ fontSize: '2rem', }} />

        </Grid>
      </Grid>

    </Grid>

  );
}

export default DoctorRoom;
