import "../css/styles.css";
import { useState } from "react";

import background from "../components/assets/images/mainscene/background.png";
import ClassCreation from "../components/scenes/ClassCreation";

import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [init, setInit] = useState(false);

  const renderStartGame = () => {
    return (
      <div className="map-container">
        <img
          alt="Main Background"
          className="main-room-image"
          style={{ objectPosition: "50% 60%" }}
          src={background}
        />
        <div className="start-container">
          <h1 className="fenrir">Fenrir</h1>
          <div
            style={{
              display: "flex",

              justifyContent: "center",
            }}
          >
            <button className="start-game-btn" onClick={() => setInit(true)}>
              <h2>Start Game</h2>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="canvas">{init ? <ClassCreation /> : renderStartGame()}</div>
  );
  return (
    <>
      <Head>
        <title>Fenrir</title>
      </Head>
      //
      <div className="">Nothing</div>
    </>
  );
}

export default MyApp;
