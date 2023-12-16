/* eslint-disable @next/next/no-img-element */

import LoginWidget from "../components/LoginWidget";
import styles from "../styles/login.module.css";

export default function LoginPage() {
  return (
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
  );
}
