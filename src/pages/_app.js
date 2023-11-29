/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import "@/styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <div>
      <Head className="justify-center text-center">
        <title className="justify-center text-center">MiddHousing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </div>
  );
}
