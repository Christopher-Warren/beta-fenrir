// import "../css/style.css";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  // can access props here
  console.log(pageProps);
  return (
    <>
      <Head>
        <title>Fenrir</title>
      </Head>

      <div className="">Nothing</div>
    </>
  );
}

export default MyApp;
