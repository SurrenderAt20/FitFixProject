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

  useEffect(() => {
    axios.get("http://localhost:3001/api/data").then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <div className="container__container">
        <div className="cards__container">
          {data.map((item) => (
            <div
              className="list__item__card"
              key={item.id}
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
                  <h2 className="max-w-md text-4xl font-bold text-headlineDark text-center md:text-5xl md:text-center">
                    {selectedItem.name}
                  </h2>
                  <h3>
                    <b>Muscle Group:</b>
                    <br />
                    {selectedItem.muscle_category}
                  </h3>
                  <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
                    <h3 className="text-headlineDark">
                      <b>Information:</b>
                    </h3>
                    {selectedItem.information}
                  </p>
                  <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
                    <h3 className="text-headlineDark">
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
