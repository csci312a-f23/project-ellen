/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { authenticated } from "../lib/middleware";
import styles from "../styles/profile.module.css";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [dormReview, setDormReview] = useState([]);
  const [over, setOver] = useState(false);

  const [name, setName] = useState("Johnny Apple");
  const [roomsLived, setRoomsLived] = useState([]);
  const [newRoom, setNewRoom] = useState("");
  const [preferences, setPreferences] = useState({});
  const [favorites, setFavorites] = useState([]);

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

          setRoomsLived([
            data.room1 ? data.room1 : "",
            data.room2 ? data.room2 : "",
            data.room3 ? data.room3 : "",
          ]);

          if (data.room3 !== null) {
            setOver(true);
          }

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
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    }
  }

  async function getReviews(userProfile) {
    if (userProfile) {
      try {
        const response = await fetch(`/api/review/?userId=${session.user.id}`, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setDormReview(data);
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    }
  }

  async function editReview(review) {
    const reviewId = review.id;
    router.push({
      pathname: `dorms/Battell/${review.roomId}/reviews/${reviewId}`,
      query: {
        currentRating: review.dormRating,
        currentReview: review.dormReview,
      },
    });
  }

  async function deleteReview(review) {
    if (review) {
      try {
        const response = await fetch(`/api/review/?id=${review.id}`, {
          method: "DELETE",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        if (response.ok) {
          await response.json();
          const response2 = await fetch(
            `/api/review/?userId=${session.user.id}`,
            {
              method: "GET",
              headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
              }),
            },
          );
          if (response2) {
            const data2 = await response2.json();
            setDormReview(data2);
          }
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    }
  }

  useEffect(() => {
    if (status === "authenticated" && session) {
      getProfile(session.user.email);
      getReviews(session.user.email, roomsLived);
    } else if (status === "loading") {
      // do nothing
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router, dormReview]);

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

  const [showRateRoomPopup, setShowRateRoomPopup] = useState(false);

  useEffect(() => {
    // Check if the user has roomsLived and show the popup if needed
    setShowRateRoomPopup(true);
  }, []);

  const handlePopupClose = () => {
    // Set showRateRoomPopup to false when the user closes the popup
    setShowRateRoomPopup(false);
  };

  async function handleNewRoom() {
    console.log(`This is the new room ${newRoom}`);
    // console.log(`This is the new id ${session.user.id}`);

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

  async function handleDeleteRoom(room) {
    const splitRoom = room.split(" ");

    const roomId = splitRoom[1];
    console.log(`This is the room id to delete ${roomId}`);
    try {
      if (status === "authenticated" && session) {
        const response = await fetch(`/api/rooms/${roomId}`, {
          method: "DELETE",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        if (response.ok) {
          console.log(response);
          console.log("Delete successful");
        }
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  return (
    <>
      <Head>
        <title>User Profile - MiddHousing</title>
        <meta name="description" content="User profile page for MiddHousing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.body}>
        <div className={styles.otherButtonsContainer}>
          <Link href="/">
            <IconButton aria-label="Back to Home" className={styles.backButton}>
              <HomeIcon style={{ fontSize: "2rem", color: "#B8D5FF" }} />
            </IconButton>
          </Link>
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
          <Button
            variant="contained"
            className={styles.signOutButton}
            onClick={handleSignOut}
            style={{ textTransform: "none" }}
          >
            Sign out
          </Button>{" "}
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
              <input
                type="text"
                placeholder="Room"
                onChange={(text) => setNewRoom(text.target.value)}
                value={newRoom}
              />
              <button
                type="button"
                disabled={over}
                className={`${styles.addButton} ${
                  over ? styles.disabledButton : ""
                }`}
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
                      <>
                        <Button
                          variant="contained"
                          className={styles.rateButton}
                          onClick={() => handleRateRoom(room)}
                          style={{ textTransform: "none" }}
                        >
                          Rate
                        </Button>
                        <Button
                          variant="contained"
                          className={styles.rateButton}
                          onClick={() => handleDeleteRoom(room)}
                          style={{ textTransform: "none" }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </li>
                ))}
              </ul>{" "}
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.section2}>
              <div className={styles.h2}>Your Room Reviews:</div>
              <ul className={styles.reviewList}>
                {Array.isArray(dormReview) &&
                  dormReview.map((review) => (
                    <li key={review.id} className={styles.reviewItem}>
                      <div className={styles.reviewRating}>
                        {Array.from(
                          { length: parseInt(review.dormRating, 10) },
                          (_, i) => (
                            <i key={i} className="fas fa-star is-active" />
                          ),
                        )}
                      </div>
                      <p className={styles.h4}>Battell {review.roomId}</p>
                      <p className={styles.reviewText}>{review.dormReview}</p>
                      <Button
                        variant="contained"
                        className={styles.saveButton}
                        onClick={() => editReview(review)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        className={styles.saveButton}
                        onClick={() => deleteReview(review)}
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
              </ul>

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
            <Button
              variant="contained"
              className={styles.saveButton}
              onClick={handleSavePreferences}
              style={{ textTransform: "none" }}
            >
              Save
            </Button>
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

        {showRateRoomPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <p>Don&apos;t forget to rate a room!</p>
              <button
                type="button"
                className={styles.popupButton}
                onClick={handlePopupClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

Profile.middleware = [authenticated];
