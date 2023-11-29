import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/DormMaps.module.css";

function DormMaps({ selectedDorm }) {
  const dormImages = {
    Battell: {
      firstFloor: "/images/Battell1F.png",
      secondFloor: "/images/Battell2F.png",
      thirdFloor: "/images/Battell3F.png",
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
          />
        </div>
      ))}
    </div>
  );
}

DormMaps.propTypes = {
  selectedDorm: PropTypes.string.isRequired,
};

export default DormMaps;
