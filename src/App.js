import React, { useState, useEffect } from "react";
import SessionLength from "./Components/SessionLength";
import Session from "./Components/Session";
import "./App.scss";

function App() {
  const [pomodoro, setPomodoro] = useState(2);
  const [recess, setRecess] = useState(1);
  const [minutes, setMinutes] = useState(pomodoro);
  const [seconds, setSeconds] = useState(0);
  const [on, setOn] = useState(false);
  const [isRecess, setIsRecess] = useState(false);

  // decrease seconds
  useEffect(() => {
    if (on) {
      const id = window.setInterval(() => {
        setSeconds((c) => {
          if (c === 0) {
            return 3;
          } else {
            return c - 1;
          }
        });
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [on]);

  // decrease minutes / change setting
  useEffect(() => {
    if (seconds === 3 && minutes > 0) {
      setMinutes((c) => c - 1);
    } else if (seconds === 0 && minutes === 0) {
      setIsRecess((c) => !c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // set minutes of new setting
  useEffect(() => {
    isRecess ? setMinutes(recess) : setMinutes(pomodoro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecess]);

  function reduceTime(title) {
    if (title === "Pomodoro") {
      setPomodoro((c) => c - 1);
    }
    if (title === "Break") {
      setRecess((c) => c - 1);
    }
  }
  function increaseTime(title) {
    if (title === "Pomodoro") {
      setPomodoro((c) => c + 1);
    }
    if (title === "Break") {
      setRecess((c) => c + 1);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pomodoro Timer</h1>
        <Session session={minutes} countdown={seconds} />
        <div className="component-wrapper">
          {on ? (
            <button className="btn pause" onClick={() => setOn(false)}>
              Pause
            </button>
          ) : (
            <button className="btn start" onClick={() => setOn(true)}>
              Start
            </button>
          )}
          <button
            className="btn reset"
            onClick={() => {
              setOn(false);
              setSeconds(0);
              isRecess ? setMinutes(recess) : setMinutes(pomodoro);
            }}
          >
            Reset
          </button>
        </div>
        <div className="row">
          <SessionLength
            sessionLength={pomodoro}
            clickDown={reduceTime}
            clickUp={increaseTime}
            title="Pomodoro"
          />
          <SessionLength
            sessionLength={recess}
            clickDown={reduceTime}
            clickUp={increaseTime}
            title="Break"
          />
        </div>
      </header>
    </div>
  );
}

export default App;
