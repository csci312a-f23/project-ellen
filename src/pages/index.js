/* eslint-disable @next/next/no-img-element */
/* eslint-disable spaced-comment */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/self-closing-comp */
import Head from "next/head";

import LeafletMap from "@/components/LeafletMap";

import Link from "next/link"; // Import the Link component
import SearchBar from "@/components/MainSearchBar";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import styles from "../styles/main.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>MiddHousing</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
          crossorigin=""
        ></script>
      </Head>

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
            <article className={styles.stuff}>
              <SearchBar />
            </article>
          </div>
          <div className={styles.rightHalf}>
            <LeafletMap />
          </div>
        </section>
      </main>
    </>
  );
}
