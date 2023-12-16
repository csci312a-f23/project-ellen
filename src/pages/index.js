/* eslint-disable @next/next/no-img-element */
/* eslint-disable spaced-comment */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable react/self-closing-comp */

import LeafletMap from "@/components/LeafletMap";
import SearchBar from "@/components/MainSearchBar";
import Script from "next/script";
import Header from "@/components/Header";
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
        <Header home={false} profile />
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
