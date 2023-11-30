// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import PropTypes from "prop-types";
// import styles from "../styles/DormMaps.module.css";

// function DormMaps({ selectedDorm }) {
//   const router = useRouter();

//   const dormImages = {
//     Battell: {
//       firstFloor: "/images/Battell1F.png",
//       secondFloor: "/images/Battell2F.png",
//     },
//     Stewart: {
//       // firstFloor: "/images/StewartF1.png",
//       // secondFloor: "/images/StewartF2.png",
//       // thirdFloor: "/images/StewartF3.png",
//       // fourthFloor: "/images/StewartF4.png",
//       // fifthFloor: "/images/StewartF5.png",
//     },
//     Hepburn: {
//       // firstFloor: "/images/HepburnF1.png",
//       // secondFloor: "/images/HepburnF2.png",
//       // thirdFloor: "/images/HepburnF3.png",
//       // fourthFloor: "/images/HepburnF4.png",
//       // fifthFloor: "/images/HepburnF5.png",
//     },
//     Allen: {
//       // basement: "/images/AllenB.png",
//       // firstFloor: "/images/AllenF1.png",
//       // secondFloor: "/images/AllenF2.png",
//       // thirdFloor: "/images/AllenF3.png",
//     },
//   };

//   const imageMapData = {
//     Battell: {
//       firstFloor: [
//         // Example coordinates for Room 101
//         { roomNumber: "100", coordinates: "379,319,415,382" },
//         { roomNumber: "101", coordinates: "0,0,150,150" },
//         // Add coordinates for other rooms on the first floor
//       ],
//       secondFloor: [
//         // Example coordinates for Room 201
//         { roomNumber: "201", coordinates: "100,100,200,200" },
//         // Add coordinates for other rooms on the second floor
//       ],
//     },
//     // Add entries for other dorms and their floors as needed
//   };

//   const selectedDormImages = dormImages[selectedDorm] || {};
//   const selectedImageMapData = imageMapData[selectedDorm] || {};

//   // const [tooltip, setTooltip] = useState("");

//   const [hoveredArea, setHoveredArea] = useState(null);

//   const handleMouseOver = (roomNumber) => {
//     // setTooltip(`Room ${roomNumber}`);
//     setHoveredArea(roomNumber);
//     console.log("hovering");
//   };

//   const handleMouseOut = () => {
//     // setTooltip("");
//     setHoveredArea(null);
//   };

//   const handleRoomClick = (roomNumber) => {
//     // Add navigation logic based on the clicked room number
//     // For example: router.push(`/dorms/${selectedDorm}/${roomNumber}`);
//     console.log(`Navigating to Room ${roomNumber}`);
//     router.push(`/dorms/Battell/${roomNumber}`);
//   };

//   return (
//     <div>
//       <h1 className={styles.dormTitle}>{selectedDorm}</h1>
//       {Object.entries(selectedDormImages).map(([floorName, imagePath]) => (
//         <div key={floorName}>
//           <h4 className={styles.floorTitle}>
//             {floorName
//               .replace(/([A-Z])/g, " $1")
//               .trim()
//               .replace(/^./, (str) => str.toUpperCase())}
//           </h4>
//           <img
//             className={styles.dormImage}
//             height={500}
//             width={700}
//             src={imagePath}
//             alt={`${floorName} image`}
//             useMap={`#${selectedDorm}-${floorName}-map`}
//           />
//           <map
//             name={`${selectedDorm}-${floorName}-map`}
//             id={`${selectedDorm}-${floorName}-map`}
//           >
//             {selectedImageMapData[floorName]?.map(
//               ({ roomNumber, coordinates }) => (
//                 <area
//                   key={roomNumber}
//                   shape="rect"
//                   coords={coordinates}
//                   alt={`Room ${roomNumber}`}
//                   data-room={roomNumber}
//                   onMouseOver={() => handleMouseOver(roomNumber)}
//                   onMouseOut={handleMouseOut}
//                   onClick={() => handleRoomClick(roomNumber)}
//                   className={`${styles.clickableArea} ${
//                     hoveredArea === roomNumber ? styles.hoveredText : ""
//                   }`}
//                 />
//               ),
//             )}
//           </map>
//           {hoveredArea === selectedImageMapData.id && (
//               <div className={styles.hoveredText}>{hoveredArea}</div>
//             )}
//         </div>
//       ))}
//     </div>
//   );
// }

// // tooltip && <div className={styles.hoveredText}>{tooltip}</div>}

// DormMaps.propTypes = {
//   selectedDorm: PropTypes.string.isRequired,
// };

// export default DormMaps;

import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import styles from "../styles/DormMaps.module.css";

function DormMaps({ selectedDorm }) {
  const router = useRouter();
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

  const imageMapData = {
    Battell: {
      firstFloor: [
        // Example coordinates for Room 101
        { roomNumber: "100", coordinates: "259,219,283,261" },
        { roomNumber: "101", coordinates: "259,277,283,318" },
        { roomNumber: "102", coordinates: "287,277,313,317" },
        { roomNumber: "103", coordinates: "315,277,339,317" },
        { roomNumber: "104", coordinates: "398,277,422,317" },
        { roomNumber: "105", coordinates: "424,277,450,317" },
        { roomNumber: "106", coordinates: "423,220,450,260" },
        { roomNumber: "107", coordinates: "397,220,421,260" },
        { roomNumber: "108", coordinates: "362,192,399,217" },
        { roomNumber: "109", coordinates: "308,192,347,217" },
        { roomNumber: "110", coordinates: "362,164,401,190" },
        { roomNumber: "111", coordinates: "309,163,346,190" },
        { roomNumber: "112", coordinates: "363,136,401,162" },
        { roomNumber: "114", coordinates: "362,108,400,136" },
        { roomNumber: "115", coordinates: "308,136,346,161" },
        { roomNumber: "116", coordinates: "362,80,401,107" },
        { roomNumber: "117", coordinates: "308,108,346,135" },
        { roomNumber: "118", coordinates: "362,51,399,79" },
        { roomNumber: "119", coordinates: "308,80,347,107" },
        { roomNumber: "120", coordinates: "308,62,347,78" },
        { roomNumber: "121", coordinates: "228,275,255,313" },
        { roomNumber: "122", coordinates: "200,275,226,313" },
        { roomNumber: "125", coordinates: "58,275,84,312" },
        { roomNumber: "127", coordinates: "16,225,56,252" },
        { roomNumber: "128", coordinates: "15,197,55,223" },
        { roomNumber: "129", coordinates: "17,169,56,196" },
        { roomNumber: "130", coordinates: "15,142,56,168" },
        { roomNumber: "131", coordinates: "15,113,57,140" },
        { roomNumber: "132", coordinates: "16,86,56,112" },
        { roomNumber: "133", coordinates: "16,58,57,84" },
        { roomNumber: "135", coordinates: "71,114,111,141" },
        { roomNumber: "136", coordinates: "70,142,110,168" },
        { roomNumber: "137", coordinates: "70,171,111,195" },
        { roomNumber: "138", coordinates: "71,196,112,223" },
        { roomNumber: "141", coordinates: "115,221,142,262" },
        { roomNumber: "142", coordinates: "144,222,170,261" },
        { roomNumber: "143", coordinates: "171,222,198,259" },
        { roomNumber: "149", coordinates: "482,275,509,313" },
        { roomNumber: "152", coordinates: "512,223,537,261" },
        { roomNumber: "153", coordinates: "538,222,565,260" },
        { roomNumber: "154", coordinates: "566,223,593,261" },
        { roomNumber: "157", coordinates: "599,197,638,223" },
        { roomNumber: "158", coordinates: "599,171,638,195" },
        { roomNumber: "159", coordinates: "598,142,638,169" },
        { roomNumber: "160", coordinates: "599,114,638,140" },
        { roomNumber: "162", coordinates: "654,56,692,84" },
        { roomNumber: "163", coordinates: "655,87,691,112" },
        { roomNumber: "164", coordinates: "653,114,694,141" },
        { roomNumber: "165", coordinates: "654,143,692,168" },
        { roomNumber: "166", coordinates: "654,169,692,197" },
        { roomNumber: "167", coordinates: "654,199,692,224" },
        { roomNumber: "168", coordinates: "654,226,691,251" },
        { roomNumber: "171", coordinates: "623,276,650,314" },
        { roomNumber: "175", coordinates: "453,275,481,314" },
      ],
      secondFloor: [
        // Example coordinates for Room 201
        { roomNumber: "201", coordinates: "100,100,200,200" },
        // Add coordinates for other rooms on the second floor
      ],
    },
    // Add entries for other dorms and their floors as needed
  };

  const selectedDormImages = dormImages[selectedDorm] || {};
  const selectedImageMapData = imageMapData[selectedDorm] || {};

  const handleRoomClick = (roomNumber) => {
    // Add navigation logic based on the clicked room number
    // For example: router.push(`/dorms/${selectedDorm}/${roomNumber}`);
    console.log(`Navigating to Room ${roomNumber}`);
    router.push(`/dorms/Battell/${roomNumber}`);
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
            height={327}
            width={705}
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
                  onClick={() => handleRoomClick(roomNumber)}
                />
              ),
            )}
          </map>
        </div>
      ))}
    </div>
  );
}

DormMaps.propTypes = {
  selectedDorm: PropTypes.string.isRequired,
};

export default DormMaps;
