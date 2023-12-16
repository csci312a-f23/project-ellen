/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import DormSearchBar from "@/components/DormSearchBar";
import { authenticated } from "../../../lib/middleware";
import styles from "../../../styles/main.module.css";

export default function Rooms() {
  const [dormName, setDormName] = useState(null);
  const [dormDimensions, setDormDimensions] = useState(null);
  const [dormReview, setDormReview] = useState([]);
  const [dormRating, setDormRating] = useState([]);
  const [beds, setBeds] = useState(null);
  const [dormNumber, setDormNumber] = useState(null);

  const router = useRouter();
  const { data: session, status } = useSession();

  const { name, room } = router.query;

  const normRoom = room;

  function getType() {
    if (beds === 1) {
      return "Single";
    }
    if (beds === 2) {
      return "Double ";
    }
    if (beds === 3) {
      return "Triple";
    }
    return "N/A";
  }

  async function getRoom(currentRoomNumber) {
    if (!currentRoomNumber) {
      setDormName(name);
      setDormDimensions(173);
      setDormReview([]);
      setDormRating([]);
      setDormNumber(123);
    } else {
      try {
        const response = await fetch(`/api/rooms/${currentRoomNumber}`, {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setDormName(data.dorm);
          setDormDimensions(data.dormDimensions);
          setBeds(data.beds);
          setDormReview(data.reviews);
          setDormNumber(currentRoomNumber);

          const ratings = data.reviews.map((review) => review.dormRating);

          setDormRating(ratings);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Something went wrong");
      }
    }
  }

  useEffect(() => {
    getRoom(normRoom);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normRoom]);

  const handleClick = (command) => {
    if (command === "back") {
      router.push(`/dorms/${encodeURIComponent(name)}`);
    }
  };

  const handleAddReview = () => {
    router.push(`/dorms/${encodeURIComponent(name)}/${room}/review`);
  };

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  const calculateAvg = () => {
    const sum = dormRating.reduce((acc, rating) => acc + Number(rating), 0);
    const average = dormRating.length > 0 ? sum / dormRating.length : 0;
    const averageFixed = average.toFixed(2);

    return averageFixed;
  };

  const ratingAvg = calculateAvg(dormReview);

  const wholeStars = Math.floor(ratingAvg);
  const fractionStars = ratingAvg - wholeStars;

  return (
    <main className={styles.body}>
      <div className={styles.otherButtonsContainer}>
        <Link href="/">
          <IconButton aria-label="Back to Home" className={styles.homeButton}>
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
        <Link href="/profile">
          <Button
            variant="contained"
            startIcon={<AccountCircleIcon style={{ fontSize: "1.5rem" }} />}
            className={styles.profileButton}
            style={{ textTransform: "none" }}
          >
            My Profile
          </Button>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.leftHalf}>
          <div className={styles.leftContainer}>
            <article className={styles.stuff}>
              <DormSearchBar name={name} />
            </article>
          </div>
        </div>

        <div className={styles.rightHalf}>
          <div className={styles.rightContainer}>
            <div className={styles.topLeft}>
              <IconButton
                aria-label="Back to Map"
                className={styles.mapButton}
                onClick={() => handleClick("back")}
              >
                <MapIcon style={{ fontSize: "2rem", color: "#B8D5FF" }} />
              </IconButton>
              <div className={styles.h3}>{dormName}</div>
              <div className={styles.h2}> Room : {dormNumber} </div>
              <div className={styles.h2}> Type : {getType(beds)} </div>
              <div className={styles.h2}>
                {" "}
                Dimensions : {dormDimensions} sq ft{" "}
              </div>
              <div className={styles.h2}> Average Rating : {ratingAvg} </div>
              <div className="rating-box">
                <div className={styles.starscontainer}>
                  {Array.from({ length: wholeStars }, (_, i) => (
                    <i key={i} className="fas fa-star is-active" />
                  ))}
                  {fractionStars > 0 && (
                    <i className="fas fa-star-half-alt is-active" />
                  )}

                  {Array.from(
                    { length: 5 - wholeStars - (fractionStars > 0 ? 1 : 0) },
                    (_, i) => (
                      <i key={i} className="far fa-star unfilled-star" />
                    ),
                  )}
                </div>
              </div>
              <Button
                variant="contained"
                onClick={() => handleAddReview(room)}
                className={styles.reviewButton}
                style={{ color: "black", textTransform: "none" }}
              >
                Add Review
              </Button>
            </div>

            <div className={styles.topRight}>
              <div className={styles.imageContainer}>
                <img
                  src="/images/battell.png"
                  alt="Room Photo"
                  width={487}
                  height={325}
                />
              </div>
            </div>
            <div className={styles.reviewsRow}>
              <div className={styles.h4}> Reviews </div>
            </div>

            <div className={styles.bottomRow}>
              <ul className={styles.reviewList}>
                {dormReview.map((review) => (
                  <li key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewRating}>
                      {Array.from(
                        { length: parseInt(review.dormRating, 10) },
                        (_, i) => (
                          <i key={i} className="fas fa-star is-active" />
                        ),
                      )}
                    </div>
                    <p className={styles.reviewText}>{review.dormReview}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

Rooms.middleware = [authenticated];
