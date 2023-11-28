/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import battellinfo from "../../data/RoomImport.json";
import styles from "../styles/SearchBar.module.css";

function DormSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const dorm = battellinfo;
  const [results, setResults] = useState();

  function getRooms() {
    const roomList = dorm.map((room) => room.id);
    roomList.sort();
    setRooms(roomList);
  }

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoomView = (roomNumber) => {
    router.push(`/dorms/Battell/${roomNumber}`);
  };

  const handleOnClick = () => {
    const filteredRoomList = rooms.filter((room) => room.includes(searchTerm));
    setResults(filteredRoomList);
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
        <button
          type="button"
          className={styles.searchButton}
          onClick={() => handleOnClick(rooms)}
        >
          Search
        </button>
      </div>
      <div className="SearchBar-results">
        <ul className={styles["SearchBar-results"]}>
          {results &&
            results.map((room) => (
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
