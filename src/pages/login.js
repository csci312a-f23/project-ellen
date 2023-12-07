/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import LoginWidget from "../components/LoginWidget";
import styles from "../styles/login.module.css";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>MiddHousing</title>
        <meta name="description" content="User profile page for MiddHousing" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.body}>
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
        <LoginWidget />
      </div>
    </>
  );
}
