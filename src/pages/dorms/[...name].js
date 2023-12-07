/* eslint-disable @next/next/no-img-element */
// import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import { useState } from "react";
import Head from "next/head";

import Link from "next/link"; // Import the Link component
import { authenticated } from "../../lib/middleware";
import DormMaps from "../../components/dormMaps";
import styles from "../../styles/main.module.css";
import TestDormSearch from "../../components/TestDormSearch";

export default function DormView() {
  const router = useRouter();
  const { data: session } = useSession();

  const { name } = router.query;

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>MiddHousing</title>

        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.body}>
        <Link href="/profile">
          <button type="button" className={styles.profileButton}>
            <img
              src="/images/UserIcon.jpeg"
              alt="User Profile"
              width={20}
              height={20}
              className={styles.userIcon}
            />
            My Profile
          </button>
        </Link>
        <Link href="/">
          <button type="button" className={styles.backButton}>
            Back to Home
          </button>
        </Link>
        <div className={styles.h1}>
          <img
            height={100}
            width={300}
            src="/images/panther.png"
            alt="panther"
          />
          <h3>Middlebury Housing</h3>
        </div>
        <section className={styles.container}>
          <div className={styles.leftHalf}>
            <article className={styles.h2}>
              <h2>Find A Room</h2>
            </article>
            <article className={styles.stuff}>
              <TestDormSearch name={name} />
            </article>
          </div>
          <div className={styles.rightHalf}>
            <DormMaps selectedDorm={name} />
          </div>
        </section>
      </main>
    </>
  );
}

DormView.middleware = [authenticated];
