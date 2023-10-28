import React, { useEffect, useState } from 'react';
import ReactGl, { Marker } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Grid,Box } from '@mui/material'
import mapboxgl from 'mapbox-gl';


const MAPBOX_TOKEN = "pk.eyJ1IjoidnlzaG5hdjg5IiwiYSI6ImNsbzRjZjM2eDAwazMycWxjNDJtaGVkdGwifQ.A81mqqjURsKCE3zn4HE2jQ"

function MapComponent() {
  const [viewport, setViewport] = useState({
    longitude: 77.6247,
    latitude: 12.9027,
    zoom: 12,
  
  });

  const [address, setAddress] = useState('');

  // useEffect(() => {
  //   const map = new mapboxgl.Map({
  //     container: "map",
  //     style: "mapbox://styles/vyshnav89/clo45fnys00nf01pfg9vu5hdc",
  //     center: [viewport.longitude, viewport.latitude],
  //     zoom: viewport.zoom,
  //     accessToken: MAPBOX_TOKEN,
  //   });
  //   map.on('load', () => {
  //     console.log('Map loaded successfully.');
  //   });

  //   map.on('error', (error) => {
  //     console.error('Mapbox error:', error);
  //   });

  //   new mapboxgl.Marker().setLngLat([viewport.longitude, viewport.latitude]).addTo(map);


  // }, [address])

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
    <Box sx={{ height: '800px', position: 'relative' }}>

    <ReactGl
      mapboxAccessToken="pk.eyJ1IjoidnlzaG5hdjg5IiwiYSI6ImNsbzRjZjM2eDAwazMycWxjNDJtaGVkdGwifQ.A81mqqjURsKCE3zn4HE2jQ"
      initialValue={{
        ...viewport,
      }}
      zoom={8}
      mapStyle="mapbox://styles/vyshnav89/clo45fnys00nf01pfg9vu5hdc"
    >
      <Marker
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        draggable
        onDragEnd={(e) => {
          handleMapClick(e)
        }}
      />
    </ReactGl>
  </Box>
  );
}

export default MapComponent;
