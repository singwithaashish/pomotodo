import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import TaskPage from "@/components/tasks/TaskPage";
import {
  Button,
  Grid,
  Grommet,
  Header,
  Layer,
  Main,
  Menu,
  ResponsiveContext,
  grommet,
} from "grommet";
import MyHeader from "@/components/layout/MyHeader";
import Timer from "@/components/pomodoro/Timer";
import MyTimer from "@/components/pomodoro/Timer";
import { useEffect, useState } from "react";
// import the css home.module.css
import "@/styles/Home.module.css";
import { useAppState } from "@/components/context/appStateContext";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Grommet theme={theme}> */}
      {/* <MyHeader />  */}
      {/* {
          !state.isSessionActive && 
        } */}
      <Main
        style={
          state.isSessionActive
            ? {
                backgroundColor: "#e5e7eb",
                animation: "fadeToBlack 1s forwards",
              }
            : {
                backgroundColor: "#e5e7eb",
                animation: "fadeFromBlack 1s forwards",
              }
        }
      >
        <ResponsiveContext.Consumer>
          {(size) => (
            <Grid
              columns={size === "small" ? ["full"] : ["2/4", "2/4"]}
              gap="small"
            >
              <MyTimer />
              <TaskPage />
            </Grid>
          )}
        </ResponsiveContext.Consumer>
      </Main>
      {/* </Grommet> */}
    </>
  );
};



// type State = {
//   tasks: Task[];
//   currentTask: Task | null;
//   editingTask: Task | null;
//   currentSession: number;
//   isSessionActive: boolean;
//   sessionType: "work" | "shortBreak" | "longBreak";
//   appliedFilters?: Filter;
// };
export const getServerSideProps = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      return {
        props: {
          tasks: data,
        },
      };
    }
    catch (error) {
      return {
        props: {
          tasks: [],
        },
      };
    }

}
