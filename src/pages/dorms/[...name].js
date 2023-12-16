/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DormSearchBar from "@/components/DormSearchBar";
import { authenticated } from "../../lib/middleware";
import DormMaps from "../../components/dormMaps";
import styles from "../../styles/main.module.css";

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
    <main className={styles.body}>
      <div className={styles.otherButtonsContainer}>
        <Link href="/">
          <IconButton aria-label="Back to Home" className={styles.homeButton}>
            <HomeIcon style={{ fontSize: "2rem", color: "#B8D5FF" }} />
          </IconButton>
        </Link>
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
      </div>
      <section className={styles.container}>
        <div className={styles.leftHalf}>
          <div className={styles.leftContainer}>
            <article className={styles.stuff}>
              <DormSearchBar name={name} />
            </article>
          </div>
        </div>
        <div className={styles.rightHalf}>
          <div className={styles.mainRightContainer}>
            <div className={styles.mapRow}>
              <DormMaps selectedDorm={name} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

DormView.middleware = [authenticated];
