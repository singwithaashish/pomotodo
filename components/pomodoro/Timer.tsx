import { useState, useEffect } from 'react';
import { Box, Text } from 'grommet';

const Timer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [cycles, setCycles] = useState(0);

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
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
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
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </Box>
  );
};

export default Timer;
