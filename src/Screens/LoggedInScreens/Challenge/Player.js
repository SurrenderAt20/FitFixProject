import React, { useState, useEffect } from "react";

export const Player = ({
  id,
  name,
  color,
  initialScore,
  removePlayer,
  onScoreChange,
}) => {
  const [score, setScore] = useState(initialScore);

  /*   const incrementScore = () => {
    setScore(score + 1);
    onScoreChange(score + 1);
  };

  const decrementScore = () => {
    if (score > 0) {
      setScore(score - 1);
      onScoreChange(score - 1);
    }
  }; */

  const incrementScore = () => {
    setScore((prevScore) => {
      const newScore = prevScore + 1;
      onScoreChange(newScore);
      return newScore;
    });
  };

  const decrementScore = () => {
    setScore((prevScore) => {
      const newScore = prevScore - 1;
      if (newScore >= 0) {
        onScoreChange(newScore);
        return newScore;
      }
      return prevScore;
    });
  };

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    if (storedScores) {
      const scoresArray = JSON.parse(storedScores);
      scoresArray[id] = score;
      localStorage.setItem("scores", JSON.stringify(scoresArray));
    }
  }, [score]);

  const removePlayerWrapper = (index) => {
    removePlayer(index);
  };

  return (
    <div
      className="player bg-gray-200 rounded-md p-4 mb-4 flex items-center"
      style={{ color }}
    >
      <h3 className="font-bold text-xl" style={{ color }}>
        {name}
      </h3>
      <button
        className="ml-4 p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
        onClick={() => removePlayerWrapper(id)}
      >
        Remove Player
      </button>
      <div className="score-container ml-auto">
        <button
          className=" bg-brightRed rounded-md px-4 py-2 text-white focus:outline-none focus:shadow-outline"
          onClick={decrementScore}
        >
          -
        </button>
        <span className="score px-4 py-2">{score}</span>
        <button
          className="bg-brightRed rounded-md px-4 py-2 text-white focus:outline-none focus:shadow-outline"
          onClick={incrementScore}
        >
          +
        </button>
      </div>
    </div>
  );
};
