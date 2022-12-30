import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExerciseList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/data").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
}
