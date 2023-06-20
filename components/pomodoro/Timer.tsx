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
import { useAppState } from "../../context/appStateContext";
import { PauseFill, PlayFill, PowerReset } from "grommet-icons";
import { quotes } from "@/utils/quotes";
import showNotification from "@/utils/notification";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../../graphql/gqlQueries";
import { Task } from "@/typings";

const MyTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [updateTaskgql, {data, loading, error}] = useMutation(UPDATE_TASK);
  const [breakTime, setBreakTime] = useState(false);
  const [cycles, setCycles] = useState(0);
  
  const { state, dispatch } = useAppState();

  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    if(data) {
      dispatch({type: 'UPDATE_TASK', task: data.updateTask})
    }
  }, [data])

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
      let temp : Task = state.currentTask ?? state.tasks[0];
      temp.timeSpent = (temp.timeSpent || 0) + 25
      temp.tomatoes -= 1;
      // dispatch({type: 'UPDATE_TASK', task: {...state.currentTask!, tomatoes: state.currentTask!.tomatoes - 1, timeSpent: (state.currentTask!.timeSpent || 0) + 25 * 60}})
     await updateTaskgql({
        variables: temp,
      })
      
    } catch (error) {
      console.log(error);
    }
  };

  const startTimer = () => {
if(state.currentTask === null){
  dispatch({type: 'SET_CURRENT_TASK', task: state.tasks[0]})
}
    setTotalSeconds(state.sessionType === "work" ? 1500 : state.sessionType === "shortBreak" ? 300 : 900);
    console.log(totalSeconds);
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
    setTotalSeconds(1500);
    setBreakTime(false);
    setCycles(0);
  };

  const triggerShortBreak = () => {
    // setIsRunning(false);
    dispatch({ type: "END_SESSION" });
    dispatch({ type: "SET_SESSION_TYPE", sessionType: "shortBreak" });
    setMinutes(5);
    setSeconds(0);
    setTotalSeconds(300);
    setBreakTime(true);
  };

  const triggerLongBreak = () => {
    // setIsRunning(false);
    dispatch({ type: "END_SESSION" });
    dispatch({ type: "SET_SESSION_TYPE", sessionType: "longBreak" });
    setMinutes(15);
    setSeconds(0);
    setTotalSeconds(900);
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
                  color: state.sessionType === "work" ? "#ea580c" : state.sessionType === "shortBreak" ? "#84cc16" : "#4d7c0f",
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
                      value: 100 -
                      ((minutes * 60 + seconds) / totalSeconds) * 100,
                      color: state.sessionType === "work" ? "#ea580c" : state.sessionType === "shortBreak" ? "#84cc16" : "#4d7c0f",
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
