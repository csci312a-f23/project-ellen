import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/DormMaps.module.css";

function DormMaps({ selectedDorm }) {
  const dormImages = {
    Battell: {
      firstFloor: "/images/Battell1F.png",
      secondFloor: "/images/Battell2F.png",
    },
    Stewart: {
      // firstFloor: "/images/StewartF1.png",
      // secondFloor: "/images/StewartF2.png",
      // thirdFloor: "/images/StewartF3.png",
      // fourthFloor: "/images/StewartF4.png",
      // fifthFloor: "/images/StewartF5.png",
    },
    Hepburn: {
      // firstFloor: "/images/HepburnF1.png",
      // secondFloor: "/images/HepburnF2.png",
      // thirdFloor: "/images/HepburnF3.png",
      // fourthFloor: "/images/HepburnF4.png",
      // fifthFloor: "/images/HepburnF5.png",
    },
    Allen: {
      // basement: "/images/AllenB.png",
      // firstFloor: "/images/AllenF1.png",
      // secondFloor: "/images/AllenF2.png",
      // thirdFloor: "/images/AllenF3.png",
    },
  };
  const selectedDormImages = dormImages[selectedDorm] || {};

  const imageMapData = {
    Battell: {
      firstFloor: [
        // Example coordinates for Room 101
        { roomNumber: "100", coordinates: "379,319,415,382" },
        { roomNumber: "101", coordinates: "0,0,150,150" },
        // Add coordinates for other rooms on the first floor
      ],
      secondFloor: [
        // Example coordinates for Room 201
        { roomNumber: "201", coordinates: "100,100,200,200" },
        // Add coordinates for other rooms on the second floor
      ],
    },
    // Add entries for other dorms and their floors as needed
  };

  const selectedImageMapData = imageMapData[selectedDorm] || {};

  const [tooltip, setTooltip] = useState("");

  const handleMouseOver = (roomNumber) => {
    setTooltip(`Room ${roomNumber}`);
    console.log("hovering");
  };

  const handleMouseOut = () => {
    setTooltip("");
  };

  const handleRoomClick = (roomNumber) => {
    // Add navigation logic based on the clicked room number
    // For example: router.push(`/dorms/${selectedDorm}/${roomNumber}`);
    console.log(`Navigating to Room ${roomNumber}`);
  };

  return (
    <div>
      <h1 className={styles.dormTitle}>{selectedDorm}</h1>
      {Object.entries(selectedDormImages).map(([floorName, imagePath]) => (
        <div key={floorName}>
          <h4 className={styles.floorTitle}>
            {floorName
              .replace(/([A-Z])/g, " $1")
              .trim()
              .replace(/^./, (str) => str.toUpperCase())}
          </h4>
          <img
            className={styles.dormImage}
            height={500}
            width={700}
            src={imagePath}
            alt={`${floorName} image`}
            useMap={`#${selectedDorm}-${floorName}-map`}
          />
          <map
            name={`${selectedDorm}-${floorName}-map`}
            id={`${selectedDorm}-${floorName}-map`}
          >
            {selectedImageMapData[floorName]?.map(
              ({ roomNumber, coordinates }) => (
                <area
                  key={roomNumber}
                  shape="rect"
                  coords={coordinates}
                  alt={`Room ${roomNumber}`}
                  data-room={roomNumber}
                  onMouseOver={() => handleMouseOver(roomNumber)}
                  onMouseOut={handleMouseOut}
                  onClick={() => handleRoomClick(roomNumber)}
                  className={styles.area}
                />
              ),
            )}
          </map>
          {tooltip && <div className={styles.tooltip}>{tooltip}</div>}
        </div>
      ))}
    </div>
  );
}

DormMaps.propTypes = {
  selectedDorm: PropTypes.string.isRequired,
};

export default DormMaps;
