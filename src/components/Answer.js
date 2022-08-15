import React from "react";
import he from "he";

export default function Answer(props) {
  const answer = props.answer.allanswer.map((answer) => (
    <span
      style={{
        backgroundColor: answer.isHeld ? "cadetblue" : "transparent",
      }}
      key={answer.id}
      id={answer.id}
      onClick={() => props.handleHeld(props.answer.id, answer.id)}
    >
      {he.decode(answer.value)}
    </span>
  ));
  return <div>{answer}</div>;
}
