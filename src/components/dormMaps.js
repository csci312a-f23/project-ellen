import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import styles from "../styles/DormMaps.module.css";
import B1F from "../../public/images/B1F.png";
// import B2F from "../images/B2F.png";

function dormMaps({ selectedDorm }) {
  return (
    <div>
      <h1 className={styles.dormTitle}>{selectedDorm}</h1>
      <h4 className={styles.floorTitle}>First Floor</h4>
      <Image height={700} width={1200} src={B1F} alt="First floor image" />
      <h4 className={styles.floorTitle}>Second Floor</h4>
      <Image
        height={700}
        width={1200}
        src="/images/B2F.png"
        alt="Second floor image"
      />
    </div>
  );
}

dormMaps.propTypes = {
  selectedDorm: PropTypes.string,
};

export default dormMaps;
