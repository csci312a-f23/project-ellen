/* eslint-disable react/function-component-definition */
/* eslint-disable global-require */
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const LeafletMap = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const L = require("leaflet");

    const map = L.map(mapContainerRef.current).setView(
      [44.011309, -73.178091],
      17,
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="<https://www.openstreetmap.org/copyright>">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([44.011309, -73.178091]).addTo(map).bindPopup("Battel");

    L.marker([44.010514, -73.179014]).addTo(map).bindPopup("Forrest");

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="mapid"
      ref={mapContainerRef}
      style={{ height: "850px", width: "1000px" }}
    />
  );
};

const DynamicLeafletMapWithNoSSR = dynamic(() => Promise.resolve(LeafletMap), {
  ssr: false,
});

export default DynamicLeafletMapWithNoSSR;
