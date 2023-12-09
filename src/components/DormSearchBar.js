/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

import styles from "../styles/DormSearchBar.module.css";

function DormSearchBar({ name }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [dorms, setDorms] = useState([]);
  const [roomType, setRoomType] = useState("All");
  const [results, setResults] = useState([]);
  const router = useRouter();

  const norm = Array.isArray(name) ? name : [name];

  async function getRooms() {
    try {
      const response = await fetch("/api/rooms", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDorms(data);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  }

  useEffect(() => {
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getDormRooms() {
    const roomList = [];
    const roomIdList = [];

    for (let i = 0; i < dorms.length; i += 1) {
      if (dorms[i].dorm === norm[0]) {
        const room = dorms[i];
        roomIdList.push(room.id);
        roomList.push(room);
      }
    }

    roomList.sort();
    roomIdList.sort();

    setRooms(roomList);
    setResults(roomIdList);
  }

  useEffect(() => {
    getDormRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dorms]);

  const handleRoomView = (roomNumber) => {
    try {
      router.push(`/dorms/${name}/${roomNumber}`);
    } catch (error) {
      console.error("Failed to navigate:", error);
    }
  };

  const handleOnClick = () => {
    const type = parseInt(roomType, 10);

    const filteredRoomList = rooms
      .filter(
        (room) =>
          room.id.toString().includes(searchTerm) &&
          (roomType === "All" || room.beds === type),
      )
      .map((room) => room.id);
    setResults(filteredRoomList);
  };

  return (
    <div className={styles.body}>
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Room..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.select}
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="All">All </option>
          <option value="1">Single</option>
          <option value="2">Double</option>
          <option value="3">Triple</option>
        </select>

        <button
          type="button"
          className={styles.searchButton}
          onClick={() => handleOnClick()}
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

DormSearchBar.propTypes = {
  name: PropTypes.string.isRequired,
};
