/* eslint-disable no-console */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { authenticated } from "../../../../lib/middleware";
import styles from "../../../../styles/Review.module.css";

function Review() {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
  const { room } = router.query;

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  function postReview() {
    (async () => {
      try {
        const data = {
          userId: session.user.id.toString(),
          roomId: room.at(0),
          dormReview: comment,
          dormRating: rating,
        };
        console.log(data);
        const response = await fetch(`/api/review/${room}`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("Post response data:", responseData);
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
      <h3> Room: {room} </h3>
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
    </div>
  );
}

Review.middleware = [authenticated];

export default Review;
