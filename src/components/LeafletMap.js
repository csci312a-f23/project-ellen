/* eslint-disable react/function-component-definition */
/* eslint-disable global-require */
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const LeafletMap = () => {
  const mapContainerRef = useRef(null);
  //define the leafletmap object
  useEffect(() => {
    //import leaflet as an object
    const L = require("leaflet");
    //set the current view to Middlebury campus, with a zoom level of 17
    const map = L.map(mapContainerRef.current).setView(
      [44.011309, -73.178091],
      17,
    );
    //This block replaces the missing picture image that happens with leaflet by creating a new custom icon using the wikimedia common pin icon SVG as its image.
    const defaultIcon = new L.Icon({
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/e/ed/Map_pin_icon.svg",
      iconSize: [20, 30],
      iconAnchor: [10, 15],
      popupAnchor: [0, 0],
    });
    //sets up the tiles to be displayed on the map (the actual image of the map) as well as giving credit to original package authors.
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="<https://www.openstreetmap.org/copyright>">OpenStreetMap</a> contributors',
    }).addTo(map);
    //adds Battell custom icon marker
    L.marker([44.011309, -73.178091], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Battell">Battell</a>');
    //adds Allen custom icon marker
    L.marker([44.0129, -73.17727], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Allen">Allen</a>');
    //adds Hepburn Hall custom icon marker
    L.marker([44.008516, -73.178805], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Hepburn">Hepburn</a>');
    //adds Stewart custom icon marker
    L.marker([44.007979, -73.178643], { icon: defaultIcon })
      .addTo(map)
      .bindPopup('<a href="/dorms/Stewart">Stewart</a>');
    //refreshes map for updates 
    return () => {
      map.remove();
    };
  }, []);

  //returns the CSS for the Leafletmap
  return (
    <div
      id="mapid"
      ref={mapContainerRef}
      style={{ height: "610px", width: "1015px" }}
    />
  );
};

//this block makes sure that the leaflet map is only rendered on the client side, and not on the server side. Removing this WILL prevent the entire deployed version from running.
const DynamicLeafletMapWithNoSSR = dynamic(() => Promise.resolve(LeafletMap), {
  ssr: false,
});

export default DynamicLeafletMapWithNoSSR;
