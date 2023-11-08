/* eslint-disable spaced-comment */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/self-closing-comp */
import Head from "next/head";
//import MainSearchBar from "@/components/MainSearchBar";
//import InteractiveMap from "@/components/InteractiveMap";
import LeafletMap from "@/components/LeafletMap";
import Image from "next/image";
import Link from "next/link"; // Import the Link component
import SearchBar from "@/components/MainSearchBar";
import styles from "../styles/main.module.css";
// import panther from "../../public/images/panther.png";
import UserIcon from "../../public/images/UserIcon.jpeg";

export default function Home() {
  const panther2 = "/images/panther.png";

  const dorms = [
    "Battel",
    "Allen",
    "Hepburn",
    "Stewart",
    "Gifford",
    "Hadley",
    "Milliken",
    "Painter",
    "Atwater",
    "Coffrin",
    "Lang",
    "Kelly",
    "Pearsons",
    "Munford",
    "Chrome",
  ];

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
          <button type="button" className={styles.profileButton}>
            <Image
              src={UserIcon}
              alt="User Profile"
              width={20}
              height={20}
              className={styles.userIcon}
            />
            My Profile
          </button>
        </Link>
        <div className={styles.h1}>
          <img height={100} width={300} src={panther2} alt="panther" />
          <h3>Middlebury Housing</h3>
        </div>
        <section className={styles.container}>
          <div className={styles.leftHalf}>
            <article className={styles.h2}>
              <h2>Find A Dorm</h2>
            </article>
            <article className={styles.stuff}>
              <SearchBar dorms={dorms} />
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
