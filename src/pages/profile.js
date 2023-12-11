/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { authenticated } from "../lib/middleware";
import styles from "../styles/profile.module.css";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [dorm, setDorm] = useState("");
  const [newRoom, setNewRoom] = useState(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const [name, setName] = useState("Johnny Apple");
  const [roomsLived, setRoomsLived] = useState([
    "Battell 101",
    "Gifford 221",
    // Add more rooms if needed
  ]);
  const [preferences, setPreferences] = useState({
    // this sort of setup is just if we want the checked list
    single: false,
    double: false,
    quiet: false,
    suite: false,
    freshmen: false,
    sophomore: false,
    junior: false,
    senior: false,
    // Add more preferences if needed
  });
  const [favorites, setFavorites] = useState([
    "Forest 314",
    "Painter 121",
    // Add more favorite rooms if needed
  ]);

  async function getProfile(userProfile) {
    setName(session.user.name);
    setEmail(session.user.email);

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
        const response = await fetch(
          `/api/userProfile/?id=${session.user.id}`,
          {
            method: "GET",
            headers: new Headers({
              Accept: "application/json",
              "Content-Type": "application/json",
            }),
          },
        );
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    }
  }

  async function addRoom() {
    const newRoomInt = parseInt(newRoom, 10);
    const data = {
      id: newRoomInt,
      dorm,
    };

    try {
      const response = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        // After successfully adding the room, navigate to the review page
        router.push(`/dorms/${dorm}/${newRoom}/review`);
      } else {
        console.error("Failed to add room:", response.status);
      }
    } catch (error) {
      console.error("Error adding room:", error);
    }
  }

  const handleAddRoom = () => {
    addRoom();
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      getProfile(session.user.email);
    } else if (status === "loading") {
      // do nothing
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router]);

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

  const handleRateRoom = (room) => {
    const splitRoom = room.split(" ");
    const rateDorm = splitRoom[0];
    const roomNumber = splitRoom[1];
    router.push(`/dorms/${rateDorm}/${roomNumber}/review`);
    // console.log(`Rated room: ${room}`);
  };

  const handleSignOut = async () => {
    if (!session) {
      console.log("User is not authenticated");
      return;
    }

    try {
      const result = await signOut({ redirect: false, callbackUrl: "/login" });
      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
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
        <div className={styles.title}>
          <img
            className={styles.pantherImage}
            height={100}
            width={300}
            src="/images/panther.png"
            alt="panther"
          />
          <h3>Middlebury Housing</h3>
        </div>
        <div className={styles.otherButtonsContainer}>
          <Link href="/">
            <button type="button" className={styles.saveButton}>
              Back to Home
            </button>
          </Link>
          <button
            type="button"
            className={styles.saveButton2}
            onClick={handleSignOut}
          >
            Sign out
          </button>{" "}
        </div>

        <div className={styles.container}>
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
              <div>
                <button
                  type="button"
                  className="dropdown-btn"
                  onClick={toggleDropdown}
                >
                  Add Room
                </button>

                {isDropdownVisible && (
                  <>
                    <div className="dropdown-content">
                      <label>
                        Dorm:
                        <input
                          type="text"
                          value={dorm}
                          onChange={(e) => setDorm(e.target.value)}
                        />
                      </label>
                      <label>
                        Room:{" "}
                        <input
                          type="number"
                          value={newRoom}
                          onChange={(e) => setNewRoom(e.target.value)}
                        />
                      </label>
                    </div>
                    <button type="button" onClick={handleAddRoom}>
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.section2}>
              <div className={styles.h2}>Room Preferences:</div>
              <ul className={styles.roomList}>
                {Object.entries(preferences).map(([preference, checked]) => (
                  <li key={preference}>
                    <label>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handlePreferenceChange(preference)}
                      />{" "}
                      {preference}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.saveButtonContainer}>
              <button
                type="button"
                className={styles.saveButton}
                onClick={handleSavePreferences}
              >
                Save
              </button>
            </div>
            <div className={styles.favorites}>
              <div className={styles.h2}>Favorites</div>
              <ul className={styles.roomList}>
                {favorites.map((room, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index}>{room}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

Profile.middleware = [authenticated];
