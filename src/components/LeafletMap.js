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

    // eslint-disable-next-line new-cap
    const defaultIcon = new L.icon({
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg",
      iconSize: [20, 30],
      iconAnchor: [10, 15],
      popupAnchor: [0, 0],
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="<https://www.openstreetmap.org/copyright>">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([44.011309, -73.178091], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Battell">Battell</a>');

    L.marker([44.0129, -73.17727], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Allen">Allen</a>');

    L.marker([44.008516, -73.178805], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Hepburn">Hepburn</a>');

    L.marker([44.007979, -73.178643], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Stewart">Stewart</a>');

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="mapid"
      ref={mapContainerRef}
      style={{ height: "610px", width: "1015px" }}
    />
  );
};

const DynamicLeafletMapWithNoSSR = dynamic(() => Promise.resolve(LeafletMap), {
  ssr: false,
});

export default DynamicLeafletMapWithNoSSR;
