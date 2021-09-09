import { useState, useEffect } from 'react';
import { interval, startWith, scan } from 'rxjs';
import Container from '../Container';
import Timer from '../Timer';
import Buttons from '../Buttons';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [counter, setCounter] = useState(0);

  const milliseconds = interval(10).pipe(
    startWith(time),
    scan(time => time + 1),
  );

  useEffect(() => {
    if (timerOn) {
      const startCounter = milliseconds.subscribe(setTime);
      return () => startCounter.unsubscribe();
    }
  }, [timerOn, milliseconds]);

  const start = () => {
    milliseconds.subscribe(setTimerOn(true));
  };

  const stop = () => {
    milliseconds.subscribe(setTimerOn(false));
    setTime(0);
  };

  const wait = () => {
    setCounter(counter + 1);

    setTimeout(() => {
      setCounter(0);
    }, 300);
    if (counter === 1) {
      milliseconds.subscribe(setTimerOn(false));
      setTime(time);
    }
  };

  const reset = () => {
    milliseconds.subscribe(setTimerOn(false));
    setTime(0);

    setTimeout(() => {
      milliseconds.subscribe(setTimerOn(true));
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
