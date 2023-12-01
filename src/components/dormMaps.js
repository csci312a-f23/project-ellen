import React, { useState } from "react";
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
        { roomNumber: "200", coordinates: "254,223,303,265" },
        { roomNumber: "201", coordinates: "253,281,280,320" },
        { roomNumber: "202", coordinates: "282,281,307,319" },
        { roomNumber: "203", coordinates: "309,280,334,322" },
        { roomNumber: "204", coordinates: "336,281,361,322" },
        { roomNumber: "205", coordinates: "364,281,390,321" },
        { roomNumber: "206", coordinates: "392,280,417,321" },
        { roomNumber: "207", coordinates: "419,280,446,321" },
        { roomNumber: "208", coordinates: "419,224,446,263" },
        { roomNumber: "209", coordinates: "392,222,417,262" },
        { roomNumber: "210", coordinates: "357,195,395,221" },
        { roomNumber: "211", coordinates: "303,194,343,221" },
        { roomNumber: "212", coordinates: "356,168,396,193" },
        { roomNumber: "214", coordinates: "356,140,397,167" },
        { roomNumber: "215", coordinates: "303,167,342,193" },
        { roomNumber: "216", coordinates: "357,112,396,138" },
        { roomNumber: "217", coordinates: "302,139,342,165" },
        { roomNumber: "218", coordinates: "357,85,396,110" },
        { roomNumber: "219", coordinates: "303,112,341,137" },
        { roomNumber: "220", coordinates: "357,53,396,83" },
        { roomNumber: "221", coordinates: "302,84,341,110" },
        { roomNumber: "222", coordinates: "302,64,341,83" },
        { roomNumber: "227", coordinates: "11,256,51,278" },
        { roomNumber: "228", coordinates: "11,229,51,254" },
        { roomNumber: "229", coordinates: "11,199,51,227" },
        { roomNumber: "230", coordinates: "11,173,50,198" },
        { roomNumber: "231", coordinates: "11,143,50,172" },
        { roomNumber: "232", coordinates: "11,116,50,142" },
        { roomNumber: "233", coordinates: "11,88,50,115" },
        { roomNumber: "234", coordinates: "11,59,50,87" },
        { roomNumber: "236", coordinates: "66,117,104,143" },
        { roomNumber: "237", coordinates: "66,146,105,172" },
        { roomNumber: "238", coordinates: "66,173,104,200" },
        { roomNumber: "239", coordinates: "66,201,105,228" },
        { roomNumber: "242", coordinates: "111,224,138,265" },
        { roomNumber: "243", coordinates: "140,226,166,265" },
        { roomNumber: "244", coordinates: "168,225,192,263" },
        { roomNumber: "245", coordinates: "224,280,248,319" },
        { roomNumber: "246", coordinates: "195,280,220,318" },
        { roomNumber: "247", coordinates: "167,280,192,317" },
        { roomNumber: "248", coordinates: "141,279,164,317" },
        { roomNumber: "249", coordinates: "112,280,137,319" },
        { roomNumber: "250", coordinates: "81,280,110,321" },
        { roomNumber: "252", coordinates: "507,226,532,263" },
        { roomNumber: "253", coordinates: "536,225,559,263" },
        { roomNumber: "254", coordinates: "561,223,590,264" },
        { roomNumber: "257", coordinates: "595,201,631,227" },
        { roomNumber: "258", coordinates: "596,172,631,199" },
        { roomNumber: "259", coordinates: "596,147,631,170" },
        { roomNumber: "260", coordinates: "594,120,631,143" },
        { roomNumber: "262", coordinates: "650,61,687,88" },
        { roomNumber: "263", coordinates: "650,91,686,116" },
        { roomNumber: "265", coordinates: "649,147,686,172" },
        { roomNumber: "266", coordinates: "653,171,685,200" },
        { roomNumber: "267", coordinates: "649,201,685,225" },
        { roomNumber: "268", coordinates: "649,229,685,254" },
        { roomNumber: "269", coordinates: "650,257,687,277" },
        { roomNumber: "270", coordinates: "635,279,685,316" },
        { roomNumber: "271", coordinates: "590,280,616,319" },
        { roomNumber: "272", coordinates: "564,279,587,321" },
        { roomNumber: "273", coordinates: "534,280,559,319" },
        { roomNumber: "274", coordinates: "507,279,531,317" },
        { roomNumber: "275", coordinates: "479,280,503,317" },
        { roomNumber: "276", coordinates: "450,280,476,319" },
        { roomNumber: "264", coordinates: "651,118,686,143" },
        // Add coordinates for other rooms on the second floor
      ],
      thirdFloor: [
        { roomNumber: "301", coordinates: "71,127,105,178" },
        { roomNumber: "302", coordinates: "108,128,141,179" },
        { roomNumber: "303", coordinates: "145,127,177,181" },
        { roomNumber: "304", coordinates: "181,126,215,182" },
        { roomNumber: "305", coordinates: "218,127,250,182" },
        { roomNumber: "306", coordinates: "254,126,286,180" },
        { roomNumber: "307", coordinates: "289,126,323,180" },
        { roomNumber: "308", coordinates: "290,52,324,104" },
        { roomNumber: "309", coordinates: "253,52,286,104" },
        { roomNumber: "310", coordinates: "109,50,141,104" },
        { roomNumber: "311", coordinates: "71,50,106,104" },
      ],
    },
    // Add entries for other dorms and their floors as needed
  };

  const dimensions = {
    Battell: {
      firstFloor: { height: 327, width: 705 }, // sized to a third
      secondFloor: { height: 339, width: 701 }, // sized to a third
      thirdFloor: { height: 216, width: 391 }, // sized to a fourth
    },
    // Add dimensions for other dorms and their floors as needed
  };

  const selectedDormDimensions = dimensions[selectedDorm] || {};
  const selectedDormImages = dormImages[selectedDorm] || {};
  const selectedImageMapData = imageMapData[selectedDorm] || {};
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const handleRoomClick = (roomNumber) => {
    // Add navigation logic based on the clicked room number
    // For example: router.push(`/dorms/${selectedDorm}/${roomNumber}`);
    console.log(`Navigating to Room ${roomNumber}`);
    router.push(`/dorms/Battell/${roomNumber}`);
  };

  const handleMouseOver = (roomNumber) => {
    console.log(`hovering on ${roomNumber}`);
    setHoveredRoom(roomNumber);
  };

  const handleMouseOut = (roomNumber) => {
    console.log(`exited ${roomNumber}`);
    setHoveredRoom(null);
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
            height={selectedDormDimensions[floorName]?.height || 327}
            width={selectedDormDimensions[floorName]?.width || 705}
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
                  onMouseOver={() => handleMouseOver(roomNumber)}
                  onMouseOut={() => handleMouseOut(roomNumber)}
                />
              ),
            )}
          </map>
          {hoveredRoom && (
            <div className={styles.popup}>
              Room: {hoveredRoom}
              {/* You can customize the content and styles of the popup */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

DormMaps.propTypes = {
  selectedDorm: PropTypes.string.isRequired,
};

export default DormMaps;
