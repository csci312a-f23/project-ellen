/* eslint-disable @next/next/no-img-element */
/* eslint-disable spaced-comment */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/self-closing-comp */

import LeafletMap from "@/components/LeafletMap";

import Link from "next/link"; // Import the Link component
import SearchBar from "@/components/MainSearchBar";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Script from "next/script";
import styles from "../styles/main.module.css";

export default function Home() {
  return (
    <>
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
      ></Script>

      <main className={styles.body}>
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
        <section className={styles.container}>
          <div className={styles.leftHalf}>
            <div className={styles.leftContainer}>
              <article className={styles.stuff}>
                <SearchBar />
              </article>
            </div>
          </div>
          <div className={styles.rightHalf}>
            <div className={styles.mainRightContainer}>
              <LeafletMap />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
