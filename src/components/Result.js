import React from "react";
import he from "he";

export default function Result(props) {
  let count = 0;

  const answer = props.question.map((question) => {
    return (
      <div className="each-question-display" key={question.id}>
        <p>{he.decode(question.question)}</p>
        <div>
          {question.allanswer.map((answer) => {
            if (answer.isHeld && answer.isTrue) {
              count++;
            }
            return (
              <span
                style={{
                  backgroundColor: answer.isHeld
                    ? answer.isTrue
                      ? "lightgreen"
                      : "red"
                    : answer.isTrue
                    ? "lightgreen"
                    : "transparent",
                }}
                key={answer.id}
                id={answer.id}
              >
                {he.decode(answer.value)}
              </span>
            );
          })}
        </div>
        <hr />
      </div>
    );
  });
  const [currentScore, setCurrentScore] = React.useState(count);
  const [highestScore, setHighestScore] = React.useState(
    localStorage.getItem("highScore") || 0
  );
  React.useEffect(() => {
    setHighestScore((prev) => {
      return prev < currentScore ? (prev = currentScore) : prev;
    });
    localStorage.setItem("highScore", highestScore);
  }, [highestScore, currentScore]);

  return (
    <section>
      <div className="display">
        <div className="question-display">{answer}</div>
        <p>{count === 0 ? "You know nothing" : `Score:${count}/5`}</p>
        <p>Highest Score: {highestScore}</p>
        <button className="check-answer" onClick={props.showHandle}>
          Return
        </button>
      </div>
    </section>
  );
}
