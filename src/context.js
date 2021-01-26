import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  general: 9,
  books: 10,
  films: 11,
  music: 12,
  television: 14,
  nature: 17,
  computers: 18,
  mathematics: 19,
  sports: 21,
  celebrities: 26,
  animals: 27,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

// const tempUrl = `https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // useState values
  const [theme, setTheme] = useState('light-theme');
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'general',
    difficulty: 'medium',
  });

  // fetch Questions function
  const fetchQuestions = async (url) => {
    // 1) hide quiz form
    setWaiting(false);
    // 2) show loader
    setLoading(true);
    // 3) get data from api
    const response = await axios(url).catch((err) => console.log(err));
    // 4) check if data returns
    if (response) {
      // a) get questions
      const data = response.data.results;
      // b) check if successful
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setError(false);
      }
      // c) check if unsuccessful
      else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  // next question btn function
  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const newIndex = oldIndex + 1;
      if (newIndex > questions.length - 1) {
        setShowModal(true);
        return 0;
      }
      return newIndex;
    });
  };

  // check answer function
  const checkAnswer = (value) => {
    if (value) {
      setCorrect(correct + 1);
    }
    nextQuestion();
  };

  // play again function
  const playAgain = () => {
    setShowModal(false);
    setWaiting(true);
    setCorrect(0);
  };

  // handle change function
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  // handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${
      table[quiz.category]
    }&difficulty=${quiz.difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  // toggle theme function
  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };

  // useEffect
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // JSX
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        showModal,
        nextQuestion,
        checkAnswer,
        playAgain,
        quiz,
        handleChange,
        handleSubmit,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
