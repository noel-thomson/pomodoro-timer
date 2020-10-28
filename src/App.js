import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import SessionLength from './Components/SessionLength';
import Session from './Components/Session';
import './App.scss';
const ding =
  'https://assets.mixkit.co/sfx/preview/mixkit-modern-classic-door-bell-sound-113.mp3';

function App() {
  const [pomodoro, setPomodoro] = useState(25); // adjust
  const [recess, setRecess] = useState(5); // adjust
  const [minutes, setMinutes] = useState(pomodoro);
  const [seconds, setSeconds] = useState(0);
  const [on, setOn] = useState(false);
  const [isRecess, setIsRecess] = useState(false);
  const [play] = useSound(ding);

  // decrease seconds
  useEffect(() => {
    if (on) {
      const id = window.setInterval(() => {
        setSeconds((c) => {
          if (c === 0) {
            return 59; // adjust
          } else {
            return c - 1;
          }
        });
      }, 1000);
      return () => window.clearInterval(id);
    }
    // eslint-disable-next-line
  }, [on]);

  // decrease minutes and switch setting (pomodoro/recess)
  useEffect(() => {
    if (seconds === 59 && minutes > 0) {
      // adjust
      setMinutes((c) => c - 1);
    } else if (seconds === 0 && minutes === 0) {
      setIsRecess((c) => !c);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  // set minutes when switching to new setting
  useEffect(() => {
    play();
    isRecess ? setMinutes(recess) : setMinutes(pomodoro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecess]);

  // button functionality
  function reduceTime(title) {
    if (title === 'Pomodoro') {
      setPomodoro((c) => c - 1);
    }
    if (title === 'Break') {
      setRecess((c) => c - 1);
    }
  }
  function increaseTime(title) {
    if (title === 'Pomodoro') {
      setPomodoro((c) => c + 1);
    }
    if (title === 'Break') {
      setRecess((c) => c + 1);
    }
  }

  return (
    <div className='App'>
      <div className='App-wrapper'>
        <h1>Pomodoro Timer</h1>
        <Session session={minutes} countdown={seconds} />
        <section className='component-wrapper' id='button-wrapper'>
          {on ? (
            <button className='btn pause' onClick={() => setOn(false)}>
              Pause
            </button>
          ) : (
            <button className='btn start' onClick={() => setOn(true)}>
              Start
            </button>
          )}
          <button
            className='btn reset'
            onClick={() => {
              setOn(false);
              setSeconds(0);
              isRecess ? setMinutes(recess) : setMinutes(pomodoro);
            }}
          >
            Reset
          </button>
        </section>
        <section id='session-length-container'>
          <SessionLength
            sessionLength={pomodoro}
            clickDown={reduceTime}
            clickUp={increaseTime}
            title='Pomodoro'
            isRecess={isRecess}
          />
          <SessionLength
            sessionLength={recess}
            clickDown={reduceTime}
            clickUp={increaseTime}
            title='Break'
            isRecess={isRecess}
          />
        </section>
        <footer>
          <p>&copy; 2020 Noel Thomson</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
