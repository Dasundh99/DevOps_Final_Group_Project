import '../styles.css';
import React, { useState } from "react";
import axios from "axios";

export default function AddGame() {
  const [GameTitle, setGameTitle] = useState("");
  const [GameGenre, setGameGenre] = useState("");
  const [RAM, setRAM] = useState("");
  const [GPU, setGPU] = useState("");
  const [ROM, setROM] = useState("");

  function sendData(e) {
    e.preventDefault();

    const newGame = {
      GameTitle,
      GameGenre,
      RAM,
      GPU,
      ROM
    };

    axios
      .post("http://localhost:8070/Game/add", newGame)
      .then(() => {
        alert("Game Added");
        setGameTitle("");
        setGameGenre("");
        setRAM("");
        setGPU("");
        setROM("");
        window.location.reload()
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={sendData}>
        <div className="mb-3">
          
          <input
            type="text"
            placeholder='Game Title'
            className="form-control"
            onChange={(e) => {
              setGameTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
        
          <input
            type="text"
            className="form-control"
            placeholder='Game Genre'
            onChange={(e) => {
              setGameGenre(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
      
          <input
            type="text"
            placeholder='RAM'
            className="form-control"
            onChange={(e) => {
              setRAM(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
     
          <input
            type="text"
            className="form-control"
            placeholder='GPU'
            onChange={(e) => {
              setGPU(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
      
          <input
            type="text"
            className="form-control"
            placeholder='ROM'
            onChange={(e) => {
              setROM(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
