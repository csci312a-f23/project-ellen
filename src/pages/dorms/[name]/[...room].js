/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link"; // Import the Link component
import DormSearchBar from "@/components/DormSearchBar";
import { authenticated } from "../../../lib/middleware";
import styles from "../../../styles/main.module.css";

export default function Rooms() {
  const [dormName, setDormName] = useState(null);
  const [dormDimensions, setDormDimensions] = useState(null);
  const [dormReview, setDormReview] = useState([]);
  const [dormRating, setDormRating] = useState(null);
  const [beds, setBeds] = useState(null);
  const [dormNumber, setDormNumber] = useState(null);
  const [type, setType] = useState(null); // only because I'm don't feel like adding to add type (single, double, etc,) to the database

  const router = useRouter();
  const { data: session, status } = useSession();

  const { name, room } = router.query;

  const normRoom = room;

  function getType() {
    if (beds === 1) {
      setType("Single");
    } else if (beds === 2) {
      setType("Double");
    } else if (beds === 3) {
      setType("Triple");
    }
  }

  async function getRoom(currentRoomNumber) {
    if (!currentRoomNumber) {
      setDormName(name);
      setDormDimensions(173);
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
          setDormRating(data.dormRating);
          setDormNumber(currentRoomNumber);

          // eslint-disable-next-line no-console
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Something went wrong");
      }
    }
  }

  useEffect(() => {
    getRoom(normRoom);
    getType();
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
              <DormSearchBar name={name} />
            </article>
          </div>
          <div className={styles.rightHalf}>
            <section className={styles.reviewsContainer}>
              <div className={styles.topLeft}>
                <button
                  type="button"
                  className={styles.backButton1}
                  onClick={() => handleClick("back")}
                >
                  Back to Map
                </button>
                <div className={styles.h3}>{dormName}</div>
                <div className={styles.h2}> Room : {dormNumber} </div>
                <div className={styles.h2}> Type : {type} </div>
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

                    {Array.from({ length: 5 - dormRating }, (_, i) => (
                      <i key={i} className="far fa-star unfilled-star" />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddReview(room)}
                  className={styles.backButton1}
                >
                  Add Review
                </button>
              </div>
              <div className={styles.topRight}>
                <div className={styles.imageContainer}>
                  <img
                    src="/images/battell.png"
                    alt="Room Photo"
                    width={605}
                    height={403}
                  />
                </div>
              </div>
              <div className={styles.bottomRow}>
                <div className={styles.h4}> Reviews </div>
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
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

Rooms.middleware = [authenticated];
