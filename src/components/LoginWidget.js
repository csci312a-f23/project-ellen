import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
      startIcon={<GoogleIcon />}
      color="primary"
      onClick={handleSignIn}
    >
      Sign in with Google
    </Button>
  );
}
