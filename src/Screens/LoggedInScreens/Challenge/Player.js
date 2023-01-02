import React, { useState, useEffect } from "react";

export const Player = ({ id, name, color, initialScore }) => {
  const [score, setScore] = useState(initialScore);

  const incrementScore = () => {
    setScore(score + 1);
  };

  const decrementScore = () => {
    setScore(score - 1);
  };

  useEffect(() => {
    // Save score to local storage when the component updates
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      const scoresArray = JSON.parse(storedScores);
      scoresArray[id] = score;
      localStorage.setItem("scores", JSON.stringify(scoresArray));
    }
  }, [score]);

  return (
    <div
      className="player bg-gray-200 rounded-md p-4 mb-4 flex items-center"
      style={{ color }}
    >
      <h3 className="font-bold text-xl" style={{ color }}>
        {name}
      </h3>
      <div className="score-container ml-auto">
        <button
          className="bg-blue-500 rounded-md px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={decrementScore}
        >
          -
        </button>
        <span className="score px-4 py-2">{score}</span>
        <button
          className="bg-blue-500 rounded-md px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          onClick={incrementScore}
        >
          +
        </button>
      </div>
    </div>
  );
};
