import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import "./Chart.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const Chart = ({ players, scores }) => {
  return (
    <div className="chart">
      {players.map((player, index) => (
        <div className="chart__bar" key={player.name}>
          <div
            className="chart__bar-value"
            style={{ height: `${scores[index] * 10}px` }}
          >
            {scores[index]}
          </div>
          <div className="chart__bar-label">{player.name}</div>
        </div>
      ))}
    </div>
  );
};
