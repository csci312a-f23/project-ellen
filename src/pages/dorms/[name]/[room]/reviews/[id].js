/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { authenticated } from "../../../../../lib/middleware";
import styles from "../../../../../styles/Review.module.css";

function Review() {
  const router = useRouter();
  const { data: session } = useSession();
  const { name } = router.query;
  const { room } = router.query;
  const { id } = router.query;
  const { currentReview, currentRating } = router.query;
  console.log(currentReview);
  console.log(currentRating);

  const [rating, setRating] = useState(currentRating);
  const [comment, setComment] = useState(currentReview);

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  function putReview() {
    (async () => {
      try {
        console.log(name);
        console.log(room);
        console.log(id);

        const data = {
          userId: session.user.id.toString(),
          roomId: room.split(" ")[0],
          dormReview: comment,
          dormRating: rating,
          reviewId: id,
        };

        const response = await fetch(`/api/review/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("This is the response data:", responseData);
          router.push(`/dorms/${encodeURIComponent(name)}/${room}`);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    })();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    putReview();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    router.push(`/dorms/${encodeURIComponent(name)}/${room}`);
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className={styles.review}>
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
      <h1 className={styles.header}>Leave a Review!</h1>
      <h3>
        {" "}
        {name} {room}{" "}
      </h3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
            className={styles.ratingInp}
          />
          <p className={styles.ratingTotal}> / 5</p>
        </div>
        <br />
        <div className={styles.comment}>
          <label>Comment:</label>
          <br />
          <textarea
            className={styles.textarea}
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        <br />
        <Button
          variant="contained"
          className={`${styles.button}`}
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
        <Button
          variant="contained"
          className={`${styles.cancelButton} ${styles.button}`}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

Review.middleware = [authenticated];

export default Review;
