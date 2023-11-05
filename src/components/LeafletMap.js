import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const L = require('leaflet');

    const map = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="<https://www.openstreetmap.org/copyright>">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="mapid" ref={mapContainerRef} style={{ height: '500px', width: '500px' }} />;
};

const DynamicLeafletMapWithNoSSR = dynamic(() => Promise.resolve(LeafletMap), {ssr: false,});

export default DynamicLeafletMapWithNoSSR;