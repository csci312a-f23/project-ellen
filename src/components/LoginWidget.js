import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../styles/login.module.css";

export default function LoginWidget() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
  }

  const handleSignIn = async () => {
    await signIn("google");
    router.push("/");
  };

  return (
    <Button
      variant="contained"
      startIcon={<GoogleIcon style={{ fontSize: "2rem" }} />}
      color="primary"
      onClick={handleSignIn}
      className={styles.button}
      style={{
        textTransform: "none",
        fontFamily: "Optima, sans-serif",
        backgroundColor: "#B8D5FF",
        color: "black",
        hover: "#bebebe",
      }}
    >
      Sign in with Google
    </Button>
  );
}
