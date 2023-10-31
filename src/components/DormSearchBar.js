/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import battelinfo from "../BattelRoomInfo.json";

import styles from "../styles/SearchBar.module.css";

function DormSearchBar() {
  // const [selectedOption, setSelectedOption] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  // const [results, setResults] = useState();
  const [rooms, setRooms] = useState();
  const router = useRouter();
  const dorm = battelinfo;

  function getRooms() {
    const roomList = [];
    dorm.forEach((room) => {
      roomList.push(room.room);
    });
    setRooms(roomList);
  }

  useEffect(() => {
    getRooms();
  }, []);

  const handleAddReview = () => {
    router.push("/review");
    console.log("Add review clicked");
  };

  const handleRoomReview = () => {
    // const room = e.target.innerText;
    router.push(`dorms/${dorm}`);
  };

  return (
    <div className={styles.container}>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="button">Search</button>
      </div>
      <div className="SearchBar-results">
        <ul onClick={handleRoomReview}>
          {rooms && rooms.map((room) => <li key={room}>{room}</li>)}
        </ul>
      </div>
      <button type="button" onClick={handleAddReview}>
        {" "}
        Add Review
      </button>
    </div>
  );
}

export default DormSearchBar;
