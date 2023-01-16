import React, { useState, useRef, useEffect } from "react";
import { Player } from "./Player";
import { Chart } from "./Chart.js";
import { LoggedInNav } from "../../../Components/LoggedInComponents/LoggedInNav";

export const Challenge = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const storedScores = localStorage.getItem("scores");
    const storedPlayers = localStorage.getItem("players");

    if (storedScores && storedPlayers) {
      setScores(JSON.parse(storedScores));
      setPlayers(JSON.parse(storedPlayers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
    localStorage.setItem("players", JSON.stringify(players));
  }, [scores, players]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlayer = inputRef.current.value;
    const storedScores = localStorage.getItem("scores");
    setPlayers([...players, newPlayer]);
    let newScore = 0;
if(storedScores){
  newScore = JSON.parse(storedScores)[players.length] || 0;
}
setScores([...scores, newScore])

/*     setScores([
      ...scores,
      storedScores ? parseInt(JSON.parse(storedScores)[players.length]) : 0,
    ]); */
    inputRef.current.value = "";
  };

  const test = (event) => {
    event.preventDefault();
    const newPlayer = inputRef.current.value;
    const storedScores = localStorage.getItem("scores");
    setPlayers([...players, newPlayer]);
    setScores([
      ...scores,
      storedScores ? JSON.parse(storedScores)[players.length] : 0,
    ]);
    /* setScores([...scores, storedScores ? storedScores[players.length] : 0]); */
    inputRef.current.value = "";
  };

  const removePlayer = (index) => {
    const updatedPlayers = players.filter((player, id) => id !== index);
    const updatedScores = scores.filter((score, id) => id !== index);
    setPlayers(updatedPlayers);
    setScores(updatedScores);
    localStorage.setItem("players", JSON.stringify(updatedPlayers));
    localStorage.setItem("scores", JSON.stringify(updatedScores));
  };

  return (
    <div text-2xl font-bold mb-4>
      <LoggedInNav />
      <div className="mt-8"></div>
      <div className="challenge flex flex-wrap justify-between">
        <form onSubmit={handleSubmit} className="w-full mt-4 md:w-1/3 p-4">
          <input
            className="bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:shadow-outline"
            type="text"
            ref={inputRef}
          />
          <button
            className="ml-4 p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
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
              removePlayer={removePlayer}
            />
          ))}
        </div>
        <div className="container mb-8 flex-row md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
          <Chart players={players} scores={scores} />
        </div>
      </div>
    </div>
  );
};
