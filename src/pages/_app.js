/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import "@/styles/globals.css";
import Head from "next/head";
/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import { SessionProvider } from "next-auth/react";

export default function App({ session, Component, pageProps }) {
  return (
    <SessionProvider session={session}>
      <div>
        <Head className="justify-center text-center">
          <title className="justify-center text-center">MiddHousing</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}
