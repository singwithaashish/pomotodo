import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Clock,
  Button,
  Heading,
  Stack,
  ResponsiveContext,
  Anchor,
  Meter,
} from "grommet";
import { useAppState } from "../context/appStateContext";
import styles from "@/styles/Home.module.css";
import { PauseFill, PlayFill, PowerReset } from "grommet-icons";
import { quotes } from "@/utils/quotes";
import showNotification from "@/utils/notification";

const MyTimer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  //   const [isRunning, setIsRunning] = useState(false);
  const [breakTime, setBreakTime] = useState(false);
  const [cycles, setCycles] = useState(0);
  const { state, dispatch } = useAppState();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (state.isSessionActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            // setIsRunning(false);
            dispatch({ type: "END_SESSION" });
            // Show notification
            breakTime
              ? showNotification("Break is over, let's get back to work!")
              : showNotification(
                  "Time for a break! Take a walk, drink some water, and come back refreshed!"
                );
            dispatch({
              type: "SET_SESSION_TYPE",
              sessionType: breakTime
                ? "work"
                : cycles > 3
                ? "longBreak"
                : "shortBreak",
            });
            setBreakTime(!breakTime);
            if (!breakTime) {
              setCycles(cycles + 1);
              // todo:  send api request to update task
              updateTask();
            }
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

  const updateTask = async () => {
    try {
      console.log({
        ...state.currentTask,
        tomatoes: state.currentTask!.tomatoes - 1,
        timeSpent: (state.currentTask!.timeSpent || 0) + 25 * 60,
      });
      const dat = await fetch(`/api/tasks/${state.currentTask?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...state.currentTask,
          tomatoes: state.currentTask!.tomatoes - 1,
          timeSpent: (state.currentTask!.timeSpent || 0) + 25 * 60,
        }),
      });
      const res = await dat.json();
      dispatch({
        type: "UPDATE_TASK",
        task: res,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const startTimer = () => {
    // select the task
    // dispatch({ type: "SET_CURRENT_TASK", task: state.tasks[0] });

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
    dispatch({ type: "SET_SESSION_TYPE", sessionType: "work" });
    setMinutes(25);
    setSeconds(0);
    setBreakTime(false);
    setCycles(0);
  };

  const triggerShortBreak = () => {
    // setIsRunning(false);
    dispatch({ type: "END_SESSION" });
    dispatch({ type: "SET_SESSION_TYPE", sessionType: "shortBreak" });
    setMinutes(5);
    setSeconds(0);
    setBreakTime(true);
  };

  const triggerLongBreak = () => {
    // setIsRunning(false);
    dispatch({ type: "END_SESSION" });
    dispatch({ type: "SET_SESSION_TYPE", sessionType: "longBreak" });
    setMinutes(15);
    setSeconds(0);
    setBreakTime(true);
  };

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box
          style={{
            // height: size === "small" ? "100vh" : "100vh",
            fontSize: "10rem",
            // width: "100%",
            // backgroundColor: "red",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
          align="center"
          justify="start"
          direction="column"
          gap="medium"
        >
          <Box
            direction="row"
            gap="medium"
            margin={{
              top: "medium",
              bottom: size === "small" ? "xlarge" : "medium",
            }}
          >
            <Anchor
              onClick={() => resetTimer()}
              size="small"
              label="Pomodoro"
              color={state.sessionType === "work" ? "#ea580c" : "dark-1"}
            />
            <Anchor
              onClick={() => triggerShortBreak()}
              size="small"
              label="Short Break"
              color={state.sessionType === "shortBreak" ? "#ea580c" : "dark-1"}
            />
            <Anchor
              onClick={() => triggerLongBreak()}
              size="small"
              label="Long Break"
              color={state.sessionType === "longBreak" ? "#ea580c" : "dark-1"}
            />
          </Box>

          <Stack anchor="center">
            {/* <Box
              style={
                state.isSessionActive
                  ? {
                      animation: "rotatingPulse 5.1s ease-in-out infinite",
                      height: "70vh",
                      width: "70vh",
                      borderRadius: "30%",
                      backgroundColor: state.currentTask?.color,
                    }
                  : {
                      // animation: "headerFadeDown 1s ease-in-out 1",
                      height: "70vh",
                      width: "70vh",
                      borderRadius: "30%",
                      backgroundColor: state.currentTask?.color,
                    }
              }

              // className={styles.rotatingPulsatingSquare}
            /> */}
            <Box
              style={{
                height: size === "small" ? "80vw" : "60vh",
                width: size === "small" ? "80vw" : "60vh",
                maxWidth: "100vw",
                borderRadius: "30%",
                backgroundColor: "gray",
                boxShadow: "inset 0 0 0 200px rgba(255, 255, 255, 0.5)",
                animation: state.isSessionActive
                  ? "rotatingPulseLeft 5s ease-in-out infinite"
                  : "",
              }}
              // className={styles.rotatingPulsatingSquareLeft}
            />
            <Box
              style={{
                // height: "50vh",
                // width: "50vh",
                height: size === "small" ? "60vw" : "50vh",
                width: size === "small" ? "60vw" : "50vh",
                maxWidth: "100vw",
                borderRadius: "30%",
                backgroundColor: "white",
                boxShadow: "inset 0 0 0 200px rgba(255, 255, 255, 0.5)",
                animation: state.isSessionActive
                  ? "rotatingPulse 5s ease-in-out infinite"
                  : "",
              }}
              // className={styles.rotatingPulsatingSquare}
            ></Box>
            <Stack anchor="center">
              <Heading
                level={"1"}
                style={{
                  // fontSize: "5rem",
                  // marginBottom: "10rem",
                  color: state.currentTask?.color,
                }}
              >{`${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`}</Heading>
              <Box
                style={{
                  transform: "scale(2.5)",
                  maxHeight: "5rem",
                  zIndex: -1,
                }}
              >
                <Meter
                  type="circle"
                  background="light-2"
                  values={[
                    {
                      value: (minutes * 60 + seconds) / 60,
                      color: state.currentTask?.color,
                    },
                  ]}
                  size="xxlarge"
                  thickness="xlarge"
                  round
                />
              </Box>
            </Stack>

            <Box
              direction="row"
              gap="medium"
              align="center"
              justify="center"
              style={{
                position: "absolute",
                bottom: size === "small" ? "-120px" : "-150px",
              }}
            >
              <Button
                icon={state.isSessionActive ? <PauseFill /> : <PlayFill />}
                onClick={() => {
                  state.isSessionActive ? pauseTimer() : startTimer();
                }}
              />
              <Button
                icon={<PowerReset />}
                onClick={() => {
                  resetTimer();
                }}
              />
            </Box>
          </Stack>
          {/* <Clock run={false} size='xxlarge' style={{
            fontSize: '30rem',
            height: '30rem',
        }} type="digital" time={

            `T00:${minutes.toString()}:${seconds.toString()}`
        } /> */}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};

export default MyTimer;
