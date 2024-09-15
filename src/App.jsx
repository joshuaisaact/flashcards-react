import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let quiz = [
    {
      question: "Largest mountain?",
      answer: "Everest",
    },
    {
      question: "Largest ocean?",
      answer: "Pacific",
    },
    {
      question: "A?",
      answer: "B",
    },
    {
      question: "C?",
      answer: "D",
    },
  ];

  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [flashCardFlip, setFlashCardFlip] = useState(false);
  const [questions, setQuestions] = useState(quiz);

  function handleQuizMode() {
    setQuizMode(!quizMode);
    setFlashCardFlip(false);
    setCurrentQuestion(0);
  }

  function handleFlashCardFlip() {
    setFlashCardFlip(!flashCardFlip);
  }

  function handleNextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((c) => c + 1);
    } else {
      setCurrentQuestion(0);
    }
    setFlashCardFlip(false);
  }

  function handleSubmitFlashCard(e, question, answer) {
    if (question === "" || answer === "") return;
    e.preventDefault();
    const newFlashCard = { question: question.trim(), answer: answer.trim() };
    console.log(newFlashCard);
    setQuestions((prevQuestions) => [...prevQuestions, newFlashCard]);
  }

  return (
    <div className="quiz-container">
      {quizMode ? (
        <>
          <h1>QuizMode!</h1>
          {flashCardFlip ? (
            <div className="answer">
              <h2> {questions[currentQuestion].answer} </h2>
              <div>
                <button onClick={handleFlashCardFlip}>Flip Back</button>
                <button onClick={handleNextQuestion}>Next</button>
              </div>
            </div>
          ) : (
            <div className="question">
              <h2> {questions[currentQuestion].question}</h2>
              <button onClick={handleFlashCardFlip}>Flip</button>
            </div>
          )}
          <button onClick={handleQuizMode}>Exit Quiz Mode</button>
        </>
      ) : (
        <>
          <h1>Flash Card App</h1>
          <CreateFlashCard onSubmit={handleSubmitFlashCard} />
          <button onClick={handleQuizMode}>Enter Quiz Mode!</button>
        </>
      )}
    </div>
  );
}

function CreateFlashCard({ onSubmit }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(e, question, answer);

    setQuestion("");
    setAnswer("");
  }

  return (
    <form className="create-flash-card" onSubmit={handleSubmit}>
      <h2>Create a flash card</h2>
      <label>Question:</label>
      <input
        className="create-input"
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <label>Answer:</label>
      <input
        className="create-input"
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button type="submit">Create Flash Card</button>
    </form>
  );
}

export default App;
