import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Grid } from '@mui/material'
import mapboxgl from 'mapbox-gl';


const MAPBOX_TOKEN = "pk.eyJ1IjoidnlzaG5hdjg5IiwiYSI6ImNsbzRjZjM2eDAwazMycWxjNDJtaGVkdGwifQ.A81mqqjURsKCE3zn4HE2jQ"

function MapComponentt() {
  const [viewport, setViewport] = useState({
    // style: "mapbox://styles/vyshnav89/clo45fnys00nf01pfg9vu5hdc",
    width: '100vw',
    height: '100vh',
    latitude: 12.9027,
    longitude: 77.6247,
    zoom: 12,
    accessToken: MAPBOX_TOKEN,
  });

  const [address, setAddress] = useState('');

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/vyshnav89/clo45fnys00nf01pfg9vu5hdc",
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      accessToken: MAPBOX_TOKEN,
    });
    map.on('load', () => {
      console.log('Map loaded successfully.');
    });

    map.on('error', (error) => {
      console.error('Mapbox error:', error);
    });

    new mapboxgl.Marker().setLngLat([viewport.longitude, viewport.latitude]).addTo(map);


  }, [address])

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

      <div
        id="map"
        className="col-12 col-md-6 map-container mb-4"
        style={{ height: "800px", backgroundColor: "lightgray" }}
      onClick={(e)=>handleMapClick(e)}>
      </div>

      <Grid>
        Latitude: {viewport.latitude}, Longitude: {viewport.longitude}
        {address && <Grid>Address: {address}</Grid>}
      </Grid>
    </Grid>
  );
}

export default MapComponentt;
