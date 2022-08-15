import React from "react";
import Info from "./components/Info";
import Game from "./components/Game";

export default function App() {
  const [show, setShow] = React.useState(true);
  function showHandle() {
    setShow(!show);
  }
  return (
    <section>
      {show ? (
        <Info show={show} showHandle={showHandle} />
      ) : (
        <Game show={show} showHandle={showHandle} />
      )}
    </section>
  );
}
