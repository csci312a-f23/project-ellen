import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";

export default function LoginWidget() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
  }

  return (
      <button type="button" onClick={() => signIn("google")} className={styles.button}>
        Sign in
      </button>
  );
}
