/* eslint-disable @next/next/no-img-element */

import Header from "@/components/Header";
import LoginWidget from "../components/LoginWidget";
import styles from "../styles/login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.body}>
      <Header home={false} profile={false} />
      <LoginWidget />
    </div>
  );
}
