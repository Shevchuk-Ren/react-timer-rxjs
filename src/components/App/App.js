import { useState, useEffect, useRef } from 'react';
import { Observable } from 'rxjs';
import { interval, startWith, scan } from 'rxjs';
import { timer } from 'rxjs';
import Container from '../Container';
import Timer from '../Timer';
import Buttons from '../Buttons';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [counter, setCounter] = useState(0);

  const seconds = interval(10).pipe(
    startWith(time),
    scan(time => time + 1),
  );

  useEffect(() => {
    if (timerOn) {
      const sec = seconds.subscribe(setTime);
      return () => sec.unsubscribe();
    }
  }, [timerOn, seconds]);

  const start = () => {
    // console.log(time);
    seconds.subscribe(setTimerOn(true));
    // setTimerOn(true);
    // console.log(timerOn);
  };

  const stop = () => {
    seconds.subscribe(setTimerOn(false));
    setTime(0);
  };

  const wait = () => {
    setCounter(counter + 1);

    setTimeout(() => {
      setCounter(0);
    }, 300);
    if (counter === 1) {
      seconds.subscribe(setTimerOn(false));
      setTime(time);
    }
  };

  const reset = () => {
    // setTime(prevTime => prevTime);

    seconds.subscribe(setTimerOn(false));
    setTime(0);

    setTimeout(() => {
      seconds.subscribe(setTimerOn(true));
    }, 300);
  };

  let hours = ('0' + Math.floor((time / 3.6e6) % 24)).slice(-2);
  let min = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
  let sec = ('0' + Math.floor((time / 100) % 60)).slice(-2);

  return (
    <Container>
      <Timer sec={sec} min={min} hours={hours}></Timer>

      <Buttons
        onStart={start}
        onStop={stop}
        onReset={reset}
        onWait={wait}
        status={timerOn}
      ></Buttons>
    </Container>
  );
}

export default App;
