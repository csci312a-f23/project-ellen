/* eslint-disable no-console */
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Button from "@mui/material/Button";
import styles from "../styles/profile.module.css";

export default function RightProfile({
  dormReview,
  setDormReview,
  preferences,
  setPreferences,
  favorites,
}) {
  const router = useRouter();
  const { data: session } = useSession();

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
        // Removes the review from the UI while we wait for the server to respond
        const updatedDormReview = dormReview.filter((r) => r.id !== review.id);
        setDormReview(updatedDormReview);

        // Actual deletion on the server
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

          if (response2.ok) {
            const data2 = await response2.json();

            setDormReview(data2);
          } else {
            console.error("Failed to fetch updated reviews after deletion");
          }
        } else {
          console.error("Failed to delete the review");
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    }
  }

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

  return (
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
  );
}

RightProfile.propTypes = {
  dormReview: PropTypes.arrayOf(
    PropTypes.shape({
      roomId: PropTypes.string.isRequired,
      userID: PropTypes.string.isRequired,
      dormReview: PropTypes.string.isRequired,
      dormRating: PropTypes.number.isRequired,
    }),
  ).isRequired,
  setDormReview: PropTypes.func.isRequired,
  setPreferences: PropTypes.func.isRequired,
  preferences: PropTypes.objectOf(PropTypes.bool).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
};
