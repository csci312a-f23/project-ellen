import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/profile.module.css";
import UserIcon from "../../public/images/UserIcon.jpeg";

export default function Profile() {
  const router = useRouter();

  const [name, setName] = useState("John Smith");
  const [roomsLived, setRoomsLived] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [favorites, setFavorites] = useState([]);

  async function getProfile(userProfile) {
    if (!userProfile) {
      setName("John Smith");
      setRoomsLived(["Battell 101", "Gifford 221"]);
      setPreferences({
        single: false,
        double: false,
        suite: false,
        quiet: false,
        freshmen: false,
        sophomore: false,
        junior: false,
        senior: false,
      });
      setFavorites(["Forest 314", "Painter 121"]);
    } else {
      try {
        const response = await fetch("/api/userProfile", {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setRoomsLived(data.roomsLived);
          setPreferences(data.preferences);
          setFavorites(data.favorites);
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const handlePreferenceChange = (preferenceName) => {
    // this is for the checked preferences list
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [preferenceName]: !prevPreferences[preferenceName],
    }));
  };

  const handleSavePreferences = () => {
    // will be updated once we have database set up
    const selectedPreferences = Array.from(
      document.querySelectorAll('input[type="checkbox"]:checked'),
    ).map((checkbox) => checkbox.name); // doesn't fully work

    console.log("Selected Preferences:", selectedPreferences);
  };

  const handleRateRoom = (roomName) => {
    // will be updated once we have the rating form
    router.push(`/rooms/${roomName}/review`);
    console.log(`Rated room: ${roomName}`);
  };

  return (
    <>
      <Head>
        <title>User Profile - MiddHousing</title>
        <meta name="description" content="User profile page for MiddHousing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.body}>
        <div className={styles.profile}>
          <Image
            src={UserIcon}
            alt="User Profile"
            className={styles.userIcon}
          />
          <div className={styles.h1}>{name}</div>
        </div>
        <div className={styles.section}>
          <h2>Rooms I Have Lived In</h2>
          <ul className={styles.roomList}>
            {roomsLived.map((room, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index} className={styles.roomListItem}>
                {room}
                <button
                  type="button"
                  className={styles.saveButton}
                  onClick={() => handleRateRoom(room)}
                >
                  Rate
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.section}>
          <div className={styles.h2}>Room Preferences:</div>
          <ul className={styles.preferenceList}>
            {Object.entries(preferences).map(([preference, checked]) => (
              <li key={preference}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handlePreferenceChange(preference)}
                  />
                  {preference}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className={styles.saveButton}
          onClick={handleSavePreferences}
        >
          Save
        </button>
        <div className={styles.section}>
          <h2>Favorites</h2>
          <ul className={styles.roomList}>
            {favorites.map((room, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>{room}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}