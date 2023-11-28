import { useRouter } from "next/router";
import React, { useState } from "react";

import styles from "../styles/Review.module.css";

function Review() {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  // const [roomNumber, setRoomNumber] = useState("");
  const router = useRouter();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  /*
  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };
  */

  function postReview() {
    (async () => {
      try {
        const data = {
          rating,
          comment,
          posted: new Date().toISOString(),
        };

        const response = await fetch(`/api/review`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
        } else {
          console.log("Server error:", response.status);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    })();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    postReview();
  };
  const handleCancel = (event) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <div className={styles.review}>
      <h1 className={styles.header}>Leave a Review!</h1>
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
        {/* 
        <div className={styles.comment}>
          <label>Room Number:</label>
          <textarea value={roomNumber} onChange={handleRoomNumberChange} />
        </div>
        */}
        <br />
        <button
          type="submit"
          className={`${styles.button}`}
          onClick={handleSubmit}
        >
          Submit Review
        </button>
        <button
          type="button"
          className={`${styles.cancelButton} ${styles.button}`}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Review;
