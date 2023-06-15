import { useState, useEffect } from "react";
import { Box, Text, Clock, Button, Heading, Stack } from "grommet";
import { useAppState } from "../context/appStateContext";
import styles from  "@/styles/Home.module.css";

const MyTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  //   const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [cycles, setCycles] = useState(0);
  const { state, dispatch } = useAppState();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    console.log(state.isSessionActive);
    if (state.isSessionActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            // setIsRunning(false);
            dispatch({ type: "END_SESSION" });
            setBreakTime(!breakTime);
            if (!breakTime) setCycles(cycles + 1);
            setMinutes(breakTime ? 25 : (cycles + 1) % 4 === 0 ? 15 : 5);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!state.isSessionActive && seconds !== 0 && minutes !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => (interval ? clearInterval(interval) : undefined);
  }, [seconds, dispatch, state.isSessionActive]);

  const startTimer = () => {
    // select the task
    dispatch({ type: "SET_CURRENT_TASK", task: state.tasks[0] });

    // start the timer
    // setIsRunning(true);
    state.isSessionActive
      ? null
      : dispatch({ type: "INCREMENT_CURRENT_SESSION" });

    // update the task
    dispatch({ type: "START_SESSION" });
  };

  const pauseTimer = () => {
    // setIsRunning(false);
    dispatch({ type: "END_SESSION" });
    dispatch({ type: "INCREMENT_CURRENT_SESSION" });
  };

  const resetTimer = () => {
    // setIsRunning(false);
    dispatch({ type: "END_SESSION" });
    setMinutes(25);
    setSeconds(0);
    setBreakTime(false);
    setCycles(0);
  };

  return (
    <Box
      style={{
        height: "100vh",
        fontSize: "10rem",
        // backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack anchor="center">
        <Box
          style={

            
           state.isSessionActive ? {
            animation: "rotatingPulse 5.1s ease-in-out infinite",
            height: "70vh",
            width: "70vh",
            borderRadius: "30%",
            backgroundColor: state.currentTask?.color,
          } : {
            // animation: "headerFadeDown 1s ease-in-out 1",
            height: "70vh",
            width: "70vh",
            borderRadius: "30%",
            backgroundColor: state.currentTask?.color,
          }

        }
        
          // className={styles.rotatingPulsatingSquare}
        />
        <Box
          style={{
            height: "60vh",
            width: "60vh",
            borderRadius: "30%",
            backgroundColor: "gray",
            boxShadow: "inset 0 0 0 200px rgba(255, 255, 255, 0.5)",
            animation: state.isSessionActive ? "rotatingPulseLeft 5s ease-in-out infinite" : "",
          }}
          // className={styles.rotatingPulsatingSquareLeft}
        />
        <Box
          style={{
            height: "50vh",
            width: "50vh",
            borderRadius: "30%",
            backgroundColor: "white",
            boxShadow: "inset 0 0 0 200px rgba(255, 255, 255, 0.5)",
            animation: state.isSessionActive ? "rotatingPulse 5s ease-in-out infinite" : "",
          }}
          // className={styles.rotatingPulsatingSquare}
        ></Box>
        <Heading
          level={"1"}
          style={{
            fontSize: "5rem",
          }}
        >{`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}</Heading>
      </Stack>
      {/* <Clock run={false} size='xxlarge' style={{
            fontSize: '30rem',
            height: '30rem',
        }} type="digital" time={

            `T00:${minutes.toString()}:${seconds.toString()}`
        } /> */}
      {state.isSessionActive ? (
        <Button onClick={pauseTimer} label="Pause"></Button>
      ) : (
        <Button onClick={startTimer} label="Start"></Button>
      )}
    </Box>
  );
};

export default MyTimer;
