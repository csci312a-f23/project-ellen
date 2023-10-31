// import React, { useState } from "react";
// import PropTypes from "prop-types";
import Image from "next/image";
import styles from "../styles/DormMaps.module.css";

function DormMaps() {
  return (
    <div>
      <h1 className={styles.dormTitle}>Battell</h1>
      <h4 className={styles.floorTitle}>First Floor</h4>
      <Image
        height={700}
        width={1200}
        src="/images/B1F.png"
        alt="First floor image"
      />
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
export default DormMaps;
