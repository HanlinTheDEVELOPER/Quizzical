import React from "react";
import Question from "./Question";
import Result from "./Result";
import { nanoid } from "nanoid";

export default function Game(props) {
  const [questions, setQuestions] = React.useState([]);
  const [result, setResult] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(() => {
          return data.results.map((question) => {
            const incorrect = question.incorrect_answers.map((answer) => {
              return {
                value: answer,
                id: nanoid(),
                isHeld: false,
                isTrue: false,
              };
            });

            const correct = {
              value: question.correct_answer,
              id: nanoid(),
              isHeld: false,
              isTrue: true,
            };
            const answer = [...incorrect];
            const randomNum = Math.floor(Math.random() * 4);
            answer.splice(randomNum, 0, correct);

            return {
              question: question.question,
              allanswer: answer,
              id: nanoid(),
            };
          });
        })
      )
      .catch((error) => {
        console.log(error);
        document.write("Bad bad CONNECTION");
      })
      .finally(() => setLoading(false));
  }, []);

  function handleHeld(qId, aId) {
    setQuestions((prev) => {
      return prev.map((questions) => {
        if (questions.id !== qId) {
          return questions;
        } else {
          const newAnswer = questions.allanswer.map((answer) => {
            return answer.id === aId
              ? { ...answer, isHeld: !answer.isHeld }
              : { ...answer, isHeld: false };
          });
          return { ...questions, allanswer: newAnswer };
        }
      });
    });
  }

  function handleShowResult() {
    setResult(!result);
  }

  return (
    <section>
      {result ? (
        <Result showHandle={props.showHandle} question={questions} />
      ) : loading ? (
        <button className="check-answer">Loading...</button>
      ) : (
        <Question
          question={questions}
          handleHeld={handleHeld}
          handleShowResult={handleShowResult}
        />
      )}
    </section>
  );
}
