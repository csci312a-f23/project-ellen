import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Review.module.css";

function Review() {
  const [rating, setRating] = useState(0);
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
    // const data = {
    //   rating,
    //   comment,
    //   posted: new Date().toISOString,
    // };
    // send data to server
  };

  const handleCancel = (event) => {
    event.preventDefault();
    router.push("/");
  };

  return (
    <div className={styles.review}>
      <h1 className={styles.header}>Review</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
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
        <button type="submit" onClick={handleSubmit}>
          Submit Review
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Review;
