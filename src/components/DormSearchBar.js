/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import battellinfo from "../../data/BattelRoomInfo.json";

import styles from "../styles/SearchBar.module.css";

function DormSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const dorm = battellinfo;

  function getRooms() {
    const roomList = dorm.map((room) => room.number);
    setRooms(roomList);
  }

  useEffect(() => {
    getRooms();
  }, []);

  const handleAddReview = () => {
    router.push("/review");
  };

  const handleRoomView = (roomNumber) => {
    router.push(`Battell/${roomNumber}`);
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
        <ul>
          {rooms &&
            rooms.map((room) => (
              <li key={room} onClick={() => handleRoomView(room)}>
                {room}
              </li>
            ))}
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
