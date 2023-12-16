import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import styles from "../styles/main.module.css";

export default function Header({ home, profile }) {
  return (
    <div>
      <div className={styles.otherButtonsContainer}>
        {home && (
          <Link href="/">
            <IconButton aria-label="Back to Home" className={styles.homeButton}>
              <HomeIcon style={{ fontSize: "2rem", color: "#B8D5FF" }} />
            </IconButton>
          </Link>
        )}
      </div>
      <div className={styles.h1}>
        <img
          className={styles.pantherImage}
          height={100}
          width={300}
          src="/images/panther.png"
          alt="panther"
        />
        <h3>Middlebury Housing</h3>
      </div>
      {profile && (
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
      )}
    </div>
  );
}

Header.propTypes = {
  home: PropTypes.bool.isRequired,
  profile: PropTypes.bool.isRequired,
};
