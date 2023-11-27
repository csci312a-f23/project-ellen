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
  const [selectedOption, setSelectedOption] = useState("All"); // testing

  function getRooms() {
    const roomList = dorm.map((room) => room.id);
    setRooms(roomList);
  }

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoomView = (roomNumber) => {
    router.push(`/dorms/Battell/${roomNumber}`);
  };

  return (
    <div className={styles.body}>
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.select}
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Single">Single</option>
          <option value="Double"> Double</option>
        </select>
        <button type="button" className={styles.select}>
          Search
        </button>
      </div>
      <div className="SearchBar-results">
        <ul className={styles["SearchBar-results"]}>
          {rooms &&
            rooms.map((room) => (
              <li key={room} onClick={() => handleRoomView(room)}>
                {room}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default DormSearchBar;
