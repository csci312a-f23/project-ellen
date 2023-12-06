/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import battellinfo from "../../data/RoomImport.json";
import styles from "../styles/DormSearchBar.module.css";

function DormSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const router = useRouter();
  const dorm = battellinfo;
  const [results, setResults] = useState([]);

  const [selectedRating, setSelectedRating] = useState("All"); // added

  function getRooms() {
    const roomList = dorm.map((room) => room.id);
    roomList.sort();
    setRooms(roomList);
    setResults(roomList); // Initialize results with all rooms
  }

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoomView = (roomNumber) => {
    router.push(`/dorms/Battell/${roomNumber}`);
  };

  // const handleOnClick = () => {
  //   const filteredRoomList = rooms.filter((room) => room.includes(searchTerm));
  //   setResults(filteredRoomList);
  // };

  const handleOnClick = () => {
    const filteredRoomList = rooms.filter(
      (room) =>
        room.includes(searchTerm) &&
        (selectedRating === "All" ||
          dorm.find((r) => r.id === room).dormRating === selectedRating),
    );
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
        <select
          className={styles.select}
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
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
                Room: {room}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default DormSearchBar;
