import React from "react";
import he from "he";
import Answer from "./Answer";

export default function Question(props) {
  const question = props.question.map((questions) => (
    <div className="each-question-display" key={questions.id}>
      <p>{he.decode(questions.question)}</p>
      <Answer answer={questions} handleHeld={props.handleHeld} />
      <hr />
    </div>
  ));

  return (
    <section>
      <div className="display">
        <div className="question-display">{question}</div>
        <button className="check-answer" onClick={props.handleShowResult}>
          Check Answer
        </button>
      </div>
    </section>
  );
}
