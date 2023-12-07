/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes, { string } from "prop-types";
import roominfo from "../../data/test/RoomInfo.json";
import styles from "../styles/DormSearchBar.module.css";

function TestDormSearch({ name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [roomType, setRoomType] = useState("All");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const norm = Array.isArray(name) ? name : [name];

  function getRooms() {
    const roomList = [];
    for (let i = 0; i < roominfo.length; i += 1) {
      if (roominfo[i].dorm === norm[0]) {
        const room = roominfo[i];
        roomList.push(room.id);
        roomList.sort();
        setRooms(roomList);
      }
      setResults(roomList);
    }
  }

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoomView = (roomNumber) => {
    router.push(`/dorms/${name}/${roomNumber}`);
  };

  const handleOnClick = () => {
    const int = parseInt(roomType, 10);
    const filteredRoomList = rooms.filter(
      (room) =>
        room.includes(searchTerm) &&
        (roomType === "All" || rooms.find((r) => r.id === room).beds === int),
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
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="All">All </option>
          <option value="1">Single </option>
          <option value="2">Double </option>
          <option value="3">Triple</option>
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

export default TestDormSearch;

TestDormSearch.propTypes = {
  name: PropTypes.arrayOf(string).isRequired,
};
