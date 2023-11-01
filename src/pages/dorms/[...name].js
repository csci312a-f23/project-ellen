// import PropTypes from "prop-types";
import { useRouter } from "next/router";
// import { useState } from "react";
import Head from "next/head";
import DormMaps from "../../components/dormMaps";
import styles from "../../styles/main.module.css";
import DormSearchBar from "../../components/DormSearchBar";
// import IMG from "../../images/Battell_F1.png";

export default function DormView() {
  const router = useRouter();
  // const [currentDorm, setCurrentDorm] = useState("");

  const { name } = router.query;

  return (
    <>
      <Head>
        <title>MiddHousing</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.body}>
        <div className={styles.h1}>Middlebury Housing</div>
        <section className={styles.container}>
          <div className={styles.leftHalf}>
            <DormSearchBar />
          </div>
          <div className={styles.rightHalf}>
            <DormMaps selectedDorm={name} />
          </div>
        </section>
      </main>
    </>
  );
}
