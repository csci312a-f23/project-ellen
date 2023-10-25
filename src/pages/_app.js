/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head className="justify-center text-center">
        <title className="justify-center text-center">MiddHousing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">MiddHousing</h1>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
