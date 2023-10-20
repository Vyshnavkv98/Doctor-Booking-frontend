import React from 'react';
import { Modal, Paper, Typography, Button } from '@mui/material'
import MapComponent from '../doctorHomeNav/mapcomponent/MapComponent';


function MapModal({ open, onClose, onSelectLocation }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ position: 'absolute', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="div">
          Select Location on Map
        </Typography>
        
        <MapComponent onSelectLocation={onSelectLocation} />
        <Button onClick={onClose}>Close Map</Button>
      </Paper>
    </Modal>
  );
}

export default MapModal;
