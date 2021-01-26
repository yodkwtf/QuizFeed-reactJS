import React from 'react';
import { useGlobalContext } from './context';
import { FaAdjust } from 'react-icons/fa';
import Footer from './Footer';

const SetupForm = () => {
  // custom hook
  const {
    quiz,
    handleChange,
    handleSubmit,
    error,
    toggleTheme,
  } = useGlobalContext();

  // jsx
  return (
    <main className="main">
      <nav>
        <div className="nav-center">
          <h1>QuizFeed</h1>
          <button className="btn" onClick={toggleTheme}>
            <FaAdjust className="toggle-icon" />
          </button>
        </div>
      </nav>
      <div id="quiz-container">
        <section className="quiz quiz-small">
          <form className="setup-form">
            <h3>Select your favourite categories</h3>
            {/* amount */}
            <div className="form-control">
              <label htmlFor="amount">number of questions(1-20)</label>
              <input
                type="number"
                name="amount"
                className="form-input"
                id="amount"
                min={1}
                max={20}
                value={quiz.amount}
                onChange={handleChange}
              />
            </div>
            {/* category*/}
            <div className="form-control">
              <label htmlFor="category">category</label>
              <select
                name="category"
                id="category"
                className="form-input"
                value={quiz.category}
                onChange={handleChange}
              >
                <option value="general">general</option>
                <option value="books">books</option>
                <option value="films">films</option>
                <option value="music">music</option>
                <option value="television">television</option>
                <option value="nature">nature</option>
                <option value="computers">computers</option>
                <option value="mathematics">mathematics</option>
                <option value="sports">sports</option>
                <option value="celebrities">celebrities</option>
                <option value="animals">animals</option>
              </select>
            </div>
            {/* difficulty*/}
            <div className="form-control">
              <label htmlFor="difficulty">difficulty</label>
              <select
                name="difficulty"
                id="difficulty"
                className="form-input"
                value={quiz.difficulty}
                onChange={handleChange}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>
            {/* error */}
            {error && (
              <p className="error">
                can't generate questions, please try different options
              </p>
            )}
            {/* start-btn */}
            <button className="submit-btn" onClick={handleSubmit}>
              start
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default SetupForm;
