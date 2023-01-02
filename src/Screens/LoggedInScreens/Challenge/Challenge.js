import React, { useState, useRef, useEffect } from "react";
import { Player } from "./Player";
import { Chart } from "./Chart.js";
import { LoggedInNav } from "../../../Components/LoggedInComponents/LoggedInNav";

export const Challenge = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    // Retrieve scores from local storage when the component mounts
    const storedScores = localStorage.getItem("scores");
    const storedPlayers = localStorage.getItem("players");

    if (storedScores && storedPlayers) {
      setScores(JSON.parse(storedScores));
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  useEffect(() => {
    // Save scores to local storage when the component updates
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("players", JSON.stringify(players));
  }, [scores, players]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlayer = inputRef.current.value;
    const storedScores = localStorage.getItem("scores");
    setPlayers([...players, newPlayer]);
    setScores([...scores, storedScores ? storedScores[players.length] : 0]);
    inputRef.current.value = "";
    /*     event.preventDefault();
    const newPlayer = inputRef.current.value;
    setPlayers([...players, newPlayer]);
    setScores([...scores, 0]); // initialize score for new player
    inputRef.current.value = ""; */
  };

  return (
    <div text-2xl font-bold mb-4>
      <LoggedInNav />
      <div className="mt-8"></div>
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
              initialScore={scores[index]}
              onScoreChange={(score) => {
                const newScores = [...scores];
                newScores[index] = score;
                setScores(newScores);
              }}
            />
          ))}
        </div>
        <div className="container flex-row md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <Chart players={players} scores={scores} />
        </div>
      </div>
    </div>
  );
};
