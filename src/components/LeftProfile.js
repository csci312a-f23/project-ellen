/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import { useSession } from "next-auth/react";
import { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import styles from "../styles/profile.module.css";

export default function LeftProfile({ over, roomsLived, name, email }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [newRoom, setNewRoom] = useState("");

  const handleRateRoom = (room) => {
    const splitRoom = room.split(" ");
    const rateDorm = splitRoom[0];
    const roomNumber = splitRoom[1];
    router.push(`/dorms/${rateDorm}/${roomNumber}/review`);
  };

  async function handleNewRoom() {
    console.log(`This is the new room ${newRoom}`);

    const userData = {
      googleId: session.user.id,
      roomData: newRoom,
    };

    if (status === "authenticated" && session) {
      const response = await fetch(`/api/userProfile/?id=${session.user.id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      if (response.ok) {
        console.log(response);
        console.log("Put successful");
      }
    }
  }

  return (
    <div className={styles.leftContainer}>
      <div className={styles.profile}>
        <img
          src="images/UserIcon.jpeg"
          alt="User Profile"
          className={styles.userIcon}
        />
        <div className={styles.h1}>{name}</div>
        <div className={styles.h1}>{email}</div>
      </div>
      <div className={styles.section1}>
        <input
          type="text"
          placeholder="Room"
          onChange={(text) => setNewRoom(text.target.value)}
          value={newRoom}
        />
        <button
          type="button"
          disabled={over}
          className={`${styles.addButton} ${over ? styles.disabledButton : ""}`}
          onClick={handleNewRoom}
        >
          Add room
        </button>{" "}
        <h2>Rooms I Have Lived In</h2>
        <ul className={styles.roomList}>
          {roomsLived.map((room, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={styles.roomListItem}>
              {room}
              {room !== "" && (
                <Button
                  variant="contained"
                  className={styles.rateButton}
                  onClick={() => handleRateRoom(room)}
                  style={{ textTransform: "none" }}
                >
                  Rate
                </Button>
              )}
            </li>
          ))}
        </ul>{" "}
      </div>
    </div>
  );
}

LeftProfile.propTypes = {
  over: PropTypes.bool.isRequired,
  roomsLived: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
