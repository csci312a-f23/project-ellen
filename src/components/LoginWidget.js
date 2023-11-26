import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginWidget() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");

    return (
      <div>
        <p>
          Signed in as {session.user.email}{" "}
          <button type="button" onClick={signOut}>
            Sign out
          </button>{" "}
        </p>
      </div>
    );
  }

  return (
    <div>
      <button type="button" onClick={() => signIn("google")}>
        Sign in
      </button>
    </div>
  );
}
