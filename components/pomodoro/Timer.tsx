import { useState, useEffect } from 'react';
import { Box, Text } from 'grommet';
import { useAppState } from '../context/appStateContext';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [cycles, setCycles] = useState(0);
  const {state, dispatch} = useAppState();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
            setBreakTime(!breakTime);
            if (!breakTime) setCycles(cycles + 1);
            setMinutes(breakTime ? 25 : (cycles + 1) % 4 === 0 ? 15 : 5);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isRunning && seconds !== 0 && minutes !== 0) {
        if (interval) clearInterval(interval);
    }
    return () => interval ? clearInterval(interval) : undefined;
  }, [isRunning, seconds]);

  const startTimer = () => {
    // select the task
    dispatch({type: "SET_CURRENT_TASK", task: state.tasks[0]});

    // start the timer
    setIsRunning(true);

    // update the task
    dispatch({type: "START_SESSION"});
  };

  const pauseTimer = () => {
    setIsRunning(false);
    dispatch({type: "END_SESSION"});
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    setBreakTime(false);
    setCycles(0);
  };

  return (
    <Box>
      <Text>{`${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`}</Text>
      {
        isRunning ? (
            <button onClick={pauseTimer}>Pause</button>
        ) : (
            <button onClick={startTimer}>Start</button>
        )

      }
    </Box>
  );
};

export default Timer;
