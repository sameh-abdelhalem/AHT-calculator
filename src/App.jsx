import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [shiftTimer, setShiftTimer] = useState(0);
  const [shiftStart, setShiftStart] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [aht, setAht] = useState(0);

  const onClickHandler = () => {
    const seconds = Math.floor(Date.now() / 1000);
    console.log("btn clicked");

    const interval = setInterval(() => {
      if (shiftTimer < 1) {
        setShiftTimer((prevState) => {
          const date = new Date();
          console.log(date.getMinutes());
          return (date.getHours() - shiftStart) * 60 + date.getMinutes();
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };
  const addAttemptHandler = () => {
    setAttempts((prevState) => {
      return prevState + 1;
    });
    // setTimeout(() => {
    //   console.log(attempts);
    //   setAht(shiftTimer / attempts);
    // }, 500);
  };
  const removeAttemptHandler = () => {
    setAttempts((prevState) => {
      return prevState - 1;
    });
    setAht(shiftTimer / attempts);
  };
  const shiftStartChangeHandler = (event) => {
    setShiftStart(event.target.value);
  };
  useEffect(() => {
    setAht(shiftTimer / attempts);
  }, [addAttemptHandler, removeAttemptHandler, shiftTimer]);
  return (
    <div className="container">
      <button onClick={onClickHandler}>Start</button>
      <input type="text" label="btn" onChange={shiftStartChangeHandler}></input>
      <p>you started your shift at {shiftStart}</p>
      <p>you've worked for {shiftTimer} mins</p>
      <div>
        <div>
          <button onClick={addAttemptHandler} className="addBtn">
            Add Attempt
          </button>
          <button onClick={removeAttemptHandler} className="removeBtn">
            Remove Attempt
          </button>
        </div>
        <p>Attempts = {attempts}</p>
        <p>your AHT is {aht}</p>
      </div>
    </div>
  );
}

export default App;
