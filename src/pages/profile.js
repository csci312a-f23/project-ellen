/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import LeftProfile from "@/components/LeftProfile";
import RightProfile from "@/components/RightProfile";
import { authenticated } from "../lib/middleware";
import styles from "../styles/profile.module.css";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [dormReview, setDormReview] = useState([]);
  const [over, setOver] = useState(false);
  const [name, setName] = useState("");
  const [roomsLived, setRoomsLived] = useState([]);
  const [showRateRoomPopup, setShowRateRoomPopup] = useState(false);

  // Set preferences and favorites here becuase we aren't using them yet
  // Just takes up more space
  const [preferences, setPreferences] = useState({
    single: false,
    double: false,
    suite: false,
    quiet: false,
    freshmen: false,
    sophomore: false,
    junior: false,
    senior: false,
  });
  const [favorites, setFavorites] = useState(["Forest 314", "Painter 121"]);

  async function getProfile(userProfile) {
    setName(session.user.name);
    setEmail(session.user.email);
    if (!userProfile) {
      setName("John Smith");
      setRoomsLived(["Battell 101", "Gifford 221"]);
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

          // disables the addroom button if the user has already lived in 3 rooms
          setOver(data.room3 !== null);

          // setPreferences(preferences);
          // setFavorites(favorites);
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

  useEffect(() => {
    if (status === "authenticated" && session) {
      getProfile(session.user.name);
      getReviews(session.user.email, roomsLived);
    } else if (status === "loading") {
      // do nothing
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, router]);

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

  useEffect(() => {
    // Hides the popup if the user has rated 3 rooms
    if (dormReview.length >= 3) {
      setShowRateRoomPopup(false);
    } else {
      setShowRateRoomPopup(true);
    }
  }, [dormReview]);

  const handlePopupClose = () => {
    // Set showRateRoomPopup to false when the user closes the popup
    setShowRateRoomPopup(false);
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
          {/* split profile into sections to make code cleaner */}
          <LeftProfile
            over={over}
            roomsLived={roomsLived}
            name={name}
            email={email}
          />
          <RightProfile
            id={session?.user.id}
            dormReview={dormReview}
            setDormReview={setDormReview}
            favorites={favorites}
            setFavorites={setFavorites}
            preferences={preferences}
            setPreferences={setPreferences}
          />
        </div>

        {showRateRoomPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <p>Don&apos;t forget to rate a room!</p>
              <br />
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
