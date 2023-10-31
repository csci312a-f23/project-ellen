import React, { useState } from "react";
// import PropTypes from "prop-types";
import Image from "next/image";
// import campusmap from "../images/campusmap.png";
import styles from "../styles/InteractiveMap.module.css";

function InteractiveMap() {
  const locations = [
    { id: "Battell", x: 610, y: 245, name: "Battell" },
    { id: "Stewart", x: 575, y: 528, name: "Stewart" },
    { id: "Hepburn", x: 565, y: 490, name: "Hepburn" },
    { id: "Allen", x: 650, y: 115, name: "Allen" },
  ];
  const [hoverDorm, setHoverDorm] = useState(null);

  return (
    <article>
      <div className={styles.mapContainer}>
        <Image height={700} width={1200} alt="campus map" />
        {locations.map((place) => (
          <div
            key={place.id}
            className={styles.dot}
            style={{ top: place.y, left: place.x }}
            onMouseEnter={() => setHoverDorm(place.id)}
            onMouseLeave={() => setHoverDorm(null)}
          >
            {hoverDorm === place.id && (
              <div className={styles.info}>{place.name}</div>
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

export default InteractiveMap;
