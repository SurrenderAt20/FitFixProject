import React, { useState, useRef } from "react";
import { Player } from "./Player";
import { Chart } from "./Chart.js";
import { LoggedInNav } from "../../../Components/LoggedInComponents/LoggedInNav";

export const Challenge = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlayer = inputRef.current.value;
    setPlayers([...players, newPlayer]);
    setScores([...scores, 0]); // initialize score for new player
    inputRef.current.value = "";
  };

  return (
    <div text-2xl font-bold mb-4>
      <LoggedInNav />
      <h2>The challenge</h2>
      <div className="challenge flex flex-wrap justify-between">
        <form onSubmit={handleSubmit} className="w-full md:w-1/3 p-4">
          <input
            className="bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:shadow-outline"
            type="text"
            ref={inputRef}
          />
          <button
            className="bg-blue-500 rounded-md px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Player
          </button>
        </form>
        <div className="w-full md:w-2/3 p-4">
          {players.map((player, index) => (
            <Player
              id={index}
              name={player}
              key={player}
              color="#000"
              initialScore={0}
              onScoreChange={(score) => {
                const newScores = [...scores];
                newScores[index] = score;
                setScores(newScores);
              }}
            />
          ))}
        </div>
        {/* <Chart players={players} scores={scores} /> */}
      </div>
    </div>
  );
};
