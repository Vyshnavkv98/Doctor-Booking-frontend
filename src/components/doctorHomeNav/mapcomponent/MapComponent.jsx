import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Grid } from '@mui/material'


const MAPBOX_TOKEN ='note'

function MapComponent() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
  });

  const [address, setAddress] = useState('');

  const handleMapClick = async (e) => {
    const { lng, lat } = e.lngLat;
    setViewport({ ...viewport, latitude: lat, longitude: lng });

    const address = await getReverseGeocoding(lat, lng);
    setAddress(address);
  };

  const getReverseGeocoding = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );

      if (response.data.features.length > 0) {
        const address = response.data.features[0].place_name;
        return address;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  return (
    <Grid>
      <h1>test</h1>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={'pk.eyJ1IjoidnlzaG5hdjg5IiwiYSI6ImNsbnNrdGZieDAxeXEycHA0YWdsZjE0N3QifQ.TP2bI-9X4AsO-vZLJRNRcw'}
        //mapboxApiAccessToken={`pk.eyJ1IjoidnlzaG5hdjg5IiwiYSI6ImNsbnNrdGZieDAxeXEycHA0YWdsZjE0N3QifQ.TP2bI-9X4AsO-vZLJRNRcw`}
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onClick={handleMapClick}
      >
        {viewport.latitude !== 0 && viewport.longitude !== 0 && (
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
          >
            <Grid>Selected Location</Grid>
          </Marker>
        )}
      </ReactMapGL>

      <Grid>
        Latitude: {viewport.latitude}, Longitude: {viewport.longitude}
        {address && <Grid>Address: {address}</Grid>}
      </Grid>
    </Grid>
  );
}

export default MapComponent;
