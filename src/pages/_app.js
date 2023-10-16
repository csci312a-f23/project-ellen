/* eslint-disable react/jsx-props-no-spreading,react/prop-types */
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
