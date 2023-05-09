import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Legend from "./components/Legend.js";
import Sidebar from "./components/Sidebar.js";
import Zoom from './components/Zoom.js';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(151.21);
  const [lat, setLat] = useState(-33.8);
  const [zoom, setZoom] = useState(7);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(0));
    });
    map.current.on('click', (e) => {
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
    });
  });

  return (
    <div>
      <div className="coordinates">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div ref={mapContainer} className="map-container" style={{ width: isOpen ? '65vw' : '100vw' }}/>
      <Legend />
      <Zoom zoomLevel={zoom}/>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
    </div>
  );
};

export default Map;