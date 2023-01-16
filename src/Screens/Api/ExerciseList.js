import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExerciseList.css";
import {
  Overlay,
  ModalContent,
  ModalContainer,
  TopContainer,
  HeaderContainer,
  TopElements,
  Button,
} from "../../Components/StyledComponents/Modal";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../img/GartnerPaint.png";

export default function ExerciseList() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [workoutName, setWorkoutName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/data").then((response) => {
      setData(response.data);
    });
  }, []);

  const handleCheckboxChange = (exercise) => {
    setSelectedExercises([...selectedExercises, exercise]);
  };

  const handleSaveWorkout = () => {
    axios
      .post("http://localhost:3001/api/saveWorkout", {
        exercises: selectedExercises,
        name: workoutName,
      })
      .then((res) => console.log(res))
      .then(setWorkoutName(""))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center m-4 p-4">
        <button
          className="p-3 px-6 pt-2 mb-4 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
          onClick={handleSaveWorkout}
        >
          Save Workout
        </button>
        <form className="m-4 mt-2 mb-5">
          <label htmlFor="workout-name"></label>
          <input
            className="border-2 ml-2 p-2 rounded"
            type="text"
            id="workout-name"
            placeholder="set program name"
            value={workoutName}
            onChange={(event) => setWorkoutName(event.target.value)}
          />
        </form>
      </div>
      <div className="container__container">
        <div className="cards__container">
          {data.map((item) => (
            <div className="list__item__card" key={item.id}>
              <div></div>
              <h3>
                <b>Name:</b>
                <br />
                {item.name}
              </h3>
              <h4>
                <b>Muscle Group:</b>
                <br />
                {item.muscle_category}
              </h4>
              <section>
                <br />
                <h3>
                  <b>Add to your workout</b>
                </h3>
                <input
                  onChange={() => handleCheckboxChange(item)}
                  type="checkbox"
                />
              </section>
              <section>
                <br />
                <a
                  className="md:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedItem({
                      name: item.name,
                      muscle_category: item.muscle_category,
                      information: item.information,
                      instructions: item.instructions,
                    });
                  }}
                >
                  Read More
                </a>
              </section>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Overlay>
          <ModalContainer>
            <ModalContent>
              <TopContainer>
                <HeaderContainer className="p-2">
                  <img className="img-responsive" src={logo} alt="Logo"></img>
                  <TopElements></TopElements>
                  <a className="p-4" onClick={() => setShowModal(false)}>
                    <AiOutlineClose />
                  </a>
                </HeaderContainer>
              </TopContainer>
              <div className="container flex-row md:flex-row items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0">
                <div className="flex md:items-center flex-col mb-28 space-y-12">
                  <h2 className="max-w-md text-4xl font-bold text-white text-center md:text-5xl md:text-center">
                    {selectedItem.name}
                  </h2>
                  <h3 className="text-white">
                    <b>Muscle Group:</b>
                    <br />
                    {selectedItem.muscle_category}
                  </h3>
                  <p className="max-w-sm text-center text-white md:text-left">
                    <h3 className="text-white">
                      <b>Information:</b>
                    </h3>
                    {selectedItem.information}
                  </p>
                  <p className="max-w-sm text-center text-white md:text-left">
                    <h3 className="text-white">
                      <b>instructions:</b>
                    </h3>
                    {selectedItem.instructions}
                  </p>
                </div>
              </div>
            </ModalContent>
          </ModalContainer>
        </Overlay>
      )}
    </div>
  );
}
