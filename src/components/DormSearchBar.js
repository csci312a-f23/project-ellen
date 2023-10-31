/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import battellinfo from "../../data/BattelRoomInfo.json";

import styles from "../styles/SearchBar.module.css";

function DormSearchBar() {
  // const [selectedOption, setSelectedOption] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  // const [results, setResults] = useState();
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const dorm = battellinfo;

  function getRooms() {
    const roomList = [];
    dorm.forEach((room) => {
      roomList.push(room.Number);
    });
    setRooms(roomList);
  }

  useEffect(() => {
    getRooms();
  }, []);

  const handleAddReview = () => {
    router.push("/review");
  };

  const handleRoomView = (e) => {
    const room = e.target.innerText;
    router.push(`rooms/${room}`);
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
        <ul onClick={handleRoomView}>
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
