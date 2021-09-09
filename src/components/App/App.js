import { useState, useEffect, useRef } from 'react';
import { Observable } from 'rxjs';
import { interval, startWith, scan } from 'rxjs';
import { timer } from 'rxjs';
import Container from '../Container';
import Timer from '../Timer';
import Buttons from '../Buttons';
import './App.css';

function App() {
  // const interval = useRef(null);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [counter, setCounter] = useState(0);
  // const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });

  const seconds = interval(1000).pipe(
    startWith(time),
    scan(time => time + 1),
  );

  useEffect(() => {
    if (timerOn) {
      console.log(time, `use`);
      // interval.current = interval(1000)
      const sec = seconds.subscribe(setTime);
      // const sec = interval.subscribe(setTime);
      return () => sec.unsubscribe();
    }
  }, [timerOn]);

  // useEffect(() => {
  //   if (timerOn) {
  //     interval.current = setInterval(() => {
  //       setTime(prevTime => prevTime + 10);
  //     }, 10);
  //   } else {
  //     clearInterval(interval.current);
  //   }
  //   return () => clearInterval(interval);
  // }, [timerOn]);

  // let updatesHours = time.h,
  //   updatesSec = time.s,
  //   updatesMin = time.m,
  //   updatesMs = 0;

  const start = () => {
    console.log(time);
    seconds.subscribe(setTimerOn(true));
    // interval.subscribe(setTimerOn(true));
    setTimerOn(true);
    console.log(timerOn);
  };

  const stop = () => {
    setTimerOn(false);
    setTime(0);
  };

  const wait = () => {
    setCounter(counter + 1);
    console.log(time, `time`);

    setTimeout(() => {
      setCounter(0);
    }, 300);
    if (counter === 1) {
      seconds.subscribe(setTimerOn(false));
      setTime(time);
    }
  };

  const reset = () => {
    seconds.subscribe(setTimerOn(false));
    setTime(0);
    console.log(time, `ttt`);
  };

  // const observable = new Observable(function subscribe(subscriber) {
  //   const id = setInterval(() => {
  //     subscriber.next('hi')
  //   }, 1000);
  // });
  // observable.subscribe(x => console.log(x));
  // const foo = new Observable(subscriber => {
  //   console.log('Hello');
  //   subscriber.next(42);
  //   subscriber.next(100); // "return" another value
  //   subscriber.next(200); // "return" yet another
  // });

  return (
    <Container>
      {/* <Timer time={time}></Timer> */}

      <Buttons
        onStart={start}
        onStop={stop}
        onReset={reset}
        onWait={wait}
        status={timerOn}
      ></Buttons>
      <div>{time}</div>
    </Container>
  );
}

export default App;
