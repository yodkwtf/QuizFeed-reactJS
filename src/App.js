import React from 'react';
import { useGlobalContext } from './context';
import { FaAdjust } from 'react-icons/fa';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
import Footer from './Footer';

function App() {
  // custom hook
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
    quiz,
    toggleTheme,
  } = useGlobalContext();

  // jsx
  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }

  // destructuring
  const { question, incorrect_answers, correct_answer } = questions[index];

  // setting up answers array
  // const answers = [...incorrect_answers, correct_answer];
  const randomIndex = Math.floor(Math.random() * 4);
  const answers = [...incorrect_answers];
  answers.splice(randomIndex, 0, correct_answer);

  return (
    <main>
      <Modal />
      <div className="main">
        <nav>
          <div className="nav-center">
            <h1>QuizFeed</h1>
            <button className="btn" onClick={toggleTheme}>
              <FaAdjust className="toggle-icon" />
            </button>
          </div>
        </nav>
        <div id="quiz-container">
          <section className="quiz">
            <div className="quiz-header">
              <h4>category: {quiz.category}</h4>
              <p className="correct-answers">
                correct answers : {correct} / {index}
              </p>
            </div>
            <article className="container">
              <h3 dangerouslySetInnerHTML={{ __html: question }} />
              <div className="btn-container">
                {answers.map((answer, index) => {
                  return (
                    <button
                      className="answer-btn"
                      key={index}
                      onClick={() => checkAnswer(correct_answer === answer)}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  );
                })}
              </div>
            </article>
            <button className="next-question" onClick={nextQuestion}>
              next question
            </button>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  );
}

export default App;
