/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import DormSearchBar from "@/components/DormSearchBar";
import Header from "@/components/Header";
import { authenticated } from "../../lib/middleware";
import DormMaps from "../../components/dormMaps";
import styles from "../../styles/main.module.css";

export default function DormView() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { name } = router.query;

  useEffect(() => {
    if (!session && status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <main className={styles.body}>
      <Header home profile />
      <section className={styles.container}>
        <div className={styles.leftHalf}>
          <div className={styles.leftContainer}>
            {name && (
              <article className={styles.stuff}>
                <DormSearchBar name={name} />
              </article>
            )}
          </div>
        </div>
        <div className={styles.rightHalf}>
          <div className={styles.mainRightContainer}>
            <div className={styles.mapRow}>
              {name && <DormMaps selectedDorm={name[0]} />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

DormView.middleware = [authenticated];
