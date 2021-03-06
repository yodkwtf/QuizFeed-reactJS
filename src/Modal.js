import React from 'react';
import { useGlobalContext } from './context';

const Modal = () => {
  // custom hook
  const { showModal, correct, questions, playAgain } = useGlobalContext();

  // calculate correct answers percentage
  const percentage = (correct / questions.length) * 100;

  // jsx
  return (
    <div className={`modal-container ${showModal ? 'isOpen' : ''}`}>
      <div className="modal-content">
        <h2>{percentage > 40 ? 'Congrats!' : 'Tough Luck!'}</h2>
        <p>You answered {percentage.toFixed(2)}% of questions correctly</p>
        <button className="close-btn" onClick={playAgain}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
