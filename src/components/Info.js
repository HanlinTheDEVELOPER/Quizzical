import React from "react";

export default function Info(props) {
  return (
    <section>
      <div className="display">
        <div className="info-display">
          <h1>Quizzical</h1>
          <p>Let's see how much you know</p>
          <button onClick={props.showHandle}>Start</button>
        </div>
      </div>
    </section>
  );
}
