import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import ReactPlayer from 'react-player';
import { useSocket } from '../../../context/SocketProvider';
import peer from '../../../services/peer';

function DoctorRoom() {
  const [mystream, setMyStream] = useState(null);
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null)
  const socket = useSocket();

  const handleUserJoin = useCallback(({ email, id }) => {
    console.log(`${email} joined in ${id}`);
    setRemoteSocketId(id);
  }, [socket]);

  const handleIncoming = useCallback(async ({ from, offer }) => {
    console.log(`incoming call from ${from}: ${offer}`);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const answer = await peer.getAnswer(offer);
    socket.emit('call:accepted', { to: from, answer });
  }, [socket]);

  const sendStream=useCallback(()=>{
    for (const track of mystream.getTracks()) {
      peer.peer.addTrack(track, mystream)
    }
  },[mystream])

  const handleCallAccepted = useCallback(({ answer, from }) => {
    console.log(`Call accepted from ${from}: ${answer}`);
    peer.setLocalDescription(answer);
     sendStream()
    
  }, [sendStream]);

  const handleNogotiationneeded = useCallback(async () => {
    const offer = await peer.getOffer()
    socket.emit('peer:nego:needed', { offer, to: remoteSocketId })
  }, [remoteSocketId, socket])

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
      console.log(remotStream,'remot stream');
      console.log('Got track');
      setRemoteStream(remotStream[0])
    })
  }, [mystream])

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit('user:call', { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);
  const handleNegotiationIncoming = useCallback(async (from, offer) => {
    const answer = await peer.getAnswer(offer);
    socket.emit('peer:nego:done', { to: from, answer });
  }, [socket]);

  const handleNegotiationFinal = useCallback(async ({ from, answer }) => {
    await peer.setLocalDescription(answer);
  }, [peer]);
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
      </Grid>
      {/* {mystream && <Button onClick={sendStream}>send stream</Button>
      } */}
    </Grid>
  );
}

export default DoctorRoom;
