import React, { useState } from 'react'
import ReactGl, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box, Typography } from '@mui/material';

function Bb() {
  const MAPBOX_TOKEN = "pk.eyJ1IjoidnlzaG5hdjg5IiwiYSI6ImNsbzRjZjM2eDAwazMycWxjNDJtaGVkdGwifQ.A81mqqjURsKCE3zn4HE2jQ"
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 12.9027,
    longitude: 77.6247,
    zoom: 12,
  });
  return (
    <Box sx={{ height: '800px', position: 'relative' }}>

      <ReactGl
        mapboxAccessToken="pk.eyJ1IjoidnlzaG5hdjg5IiwiYSI6ImNsbzRjZjM2eDAwazMycWxjNDJtaGVkdGwifQ.A81mqqjURsKCE3zn4HE2jQ"
        initialValue={{
          latitude: 12.9027,
          longitude: 77.6247,
          zoom: 12
        }}
        mapStyle="mapbox://styles/vyshnav89/clo45fnys00nf01pfg9vu5hdc"

      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          draggable
          onDragEnd={(e) => {

          }}
        />

      </ReactGl>
    </Box>
  )
}

export default Bb
