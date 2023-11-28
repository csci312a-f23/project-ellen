import Head from "next/head";
// import Image from "next/image"; // Import the Image component
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link"; // Import the Link component
import styles from "../../../styles/main.module.css";
// import battell from "../../../../public/images/battell.png";
import DormSearchBar from "../../../components/DormSearchBar";

export default function Rooms() {
  const [dormName, setDormName] = useState(null);
  const [dormDimensions, setDormDimensions] = useState(null);
  const [dormReview, setDormReview] = useState(null);
  const [dormRating, setDormRating] = useState(null);
  const [dormNumber, setDormNumber] = useState(null);

  const router = useRouter();

  const { room } = router.query;

  async function getRoom(currentRoomNumber) {
    // how would this function with this being called elsewhere, like when do we tell it what room to call
    if (!currentRoomNumber) {
      setDormName("Stewart");
      setDormDimensions(173);
      setDormReview("Comfortable and clean room.");
      setDormRating(4);
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
          setDormName("Battell");
          setDormDimensions(data.dormDimensions);
          setDormReview(data.dormReview);
          setDormRating(data.dormRating);
          setDormNumber(currentRoomNumber);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Something went wrong");
      }
    }
  }

  useEffect(() => {
    getRoom(room);
  }, [room]);

  const handleClick = (command) => {
    if (command === "back") {
      router.push(`/dorms/${encodeURIComponent(dormName)}`);
    }
  };

  const handleAddReview = () => {
    router.push("/review");
  };

  return (
    <>
      <Head>
        <title>MiddHousing</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      <main className={styles.body}>
        <Link href="/profile">
          <button type="button" className={styles.profileButton}>
            <img
              src="/images/UserIcon.jpeg"
              alt="User Profile"
              width={20}
              height={20}
              className={styles.userIcon}
            />
            My Profile
          </button>
        </Link>
        <div className={styles.h1}>
          <img
            height={100}
            width={300}
            src="/images/panther.png"
            alt="panther"
          />
          <h3>Middlebury Housing</h3>
        </div>
        <section className={styles.container}>
          <div className={styles.leftHalf}>
            <article className={styles.h2}>
              <h2>Find A Room</h2>
            </article>
            <article className={styles.stuff}>
              <DormSearchBar />
            </article>
          </div>
          <div className={styles.rightHalf}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => handleClick("back")}
            >
              Back to Map
            </button>

            <div className={styles.h3}>{dormName}</div>
            <div className={styles.h2}> Room : {dormNumber} </div>
            <div className={styles.h2}>
              {" "}
              Dimensions : {dormDimensions} sq ft{" "}
            </div>
            <div className={styles.h2}> Rating : {dormRating} </div>
            <div className="rating-box">
              <div className={styles.starscontainer}>
                {Array.from({ length: dormRating }, (_, i) => (
                  <i key={i} className="fas fa-star is-active" />
                ))}
                {/* Add unfilled stars */}
                {Array.from({ length: 5 - dormRating }, (_, i) => (
                  <i key={i} className="far fa-star unfilled-star" />
                ))}
              </div>
            </div>
            <div className={styles.h2}> Reviews : {dormReview} </div>
            <button
              type="button"
              onClick={() => handleAddReview(room)}
              className={styles.backButton}
            >
              Add Review
            </button>
            <div className={styles.imageContainer}>
              <img
                src="/images/battell.png"
                alt="Room Photo"
                width={605}
                height={403}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}