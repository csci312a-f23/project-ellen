import { useRouter } from "next/router";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Review.module.css";

function Review({ roomName }) {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      rating,
      comment,
      posted: new Date().toISOString,
    };
    (async () => {
      try {
        const response = await fetch(`/api/${roomName}/review`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        router.push(`/rooms/${roomName}`);
        console.log("Response: ", response);
      } catch (error) {
        console.log("Something went wrong: ", error);
      }
    })();
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
      <footer>{roomName}</footer>
    </div>
  );
}

export default Review;

Review.propTypes = {
  roomName: PropTypes.string.isRequired,
};
