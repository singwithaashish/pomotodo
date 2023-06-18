import { useAppState } from "@/components/context/appStateContext";
import Graph from "@/components/dashboard/Graph";
import PieChart from "@/components/dashboard/PieChart";
import StatCard from "@/components/dashboard/StatCard";
import MyHeader from "@/components/layout/MyHeader";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import exp from "constants";
import { Box, Button, DataTable, Grid, Header, Heading, Text } from "grommet";
import { CaretLeftFill, FormPrevious, Previous } from "grommet-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserWithTime = {
  id: string;
  name: string | null;
  totalTimeSpent: number;
};

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  const { state, dispatch } = useAppState();

  const [leaderboardData, setLeaderboardData] = useState<UserWithTime[]>([]);

  useEffect(() => {
    // Fetch tasks here and setTasks
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      //   setTasks(data);
      dispatch({ type: "SET_TASKS", tasks: data });
    };
    fetchTasks();
    getLeaderboardData();
  }, []);

  const getLeaderboardData = async () => {
    const response = await fetch("/api/tasks/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: UserWithTime[] = await response.json();
    // console.log(data);
    setLeaderboardData(data);
  };

  return (
    <Grid
      areas={[
        { name: "header", start: [0, 0], end: [2, 0] },
        { name: "chart", start: [0, 1], end: [1, 1] },
        { name: "graph", start: [1, 1], end: [2, 1] },
        { name: "dashboard", start: [0, 2], end: [2, 2] },
        { name: "stat1", start: [0, 3], end: [1, 3] },
        { name: "stat2", start: [1, 3], end: [2, 3] },
      ]}
      columns={["flex", "flex"]}
      rows={["xxsmall", "medium", "medium", "flex"]}
      gap="small"
      pad={"large"}
      style={{
        backgroundColor: "#ccc",
        // boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* <Heading level={1} gridArea="header" alignSelf="center" color="#fff">
        <Link href="/">
          <Button
            icon={<FormPrevious color="#fff" />}
            style={{
              width: "30px",
              height: "30px",
            }}
          />
        </Link>
        Dashboard
      </Heading> */}
      <Box
        gridArea="chart"
        pad="medium"
        justify="center"
        align="center"
        round="small"
        background={{
          color: "#fff",
          // opacity: 0.8,
        }}
      >
        {/* <Heading level="3">Chart</Heading> */}
        <Box direction="row" justify="between" align="center">
          <Heading level="3">All Tasks</Heading>
          <Box margin={{ left: "large" }} direction="column" align="start">
            <Box margin={{ left: "small" }} direction="row" align="center">
              <div
                style={{
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#e5e7eb",
                  marginRight: "5px",
                }}
              ></div>
              Total Tasks
            </Box>
            <Box margin={{ left: "small" }} direction="row" align="center">
              <div
                style={{
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#4ade80",
                  marginRight: "5px",
                }}
              ></div>
              Finished Tasks
            </Box>
          </Box>
        </Box>
        <PieChart />
      </Box>
      <Box
        gridArea="graph"
        pad="medium"
        justify="center"
        align="center"
        round="small"
        background={{
          color: "#ffffff", // Semi-transparent white
        }}
        // style={{
        //   backdropFilter: "blur(10px)",
        // }}
      >
        <Graph />
      </Box>
      <Box gridArea="stat1" justify="center" align="center">
        <StatCard label="Total Tasks" value={state.tasks.length} />
      </Box>
      <Box gridArea="stat2" justify="center" align="center">
        <StatCard
          label="Total Tomatoes"
          value={state.tasks.reduce((acc, task) => acc + task.tomatoes, 0)}
        />
      </Box>
      <Box
        gridArea="dashboard"
        justify="center"
        round="small"
        align="center"
        background={{
          color: "#fff",
          // opacity: 0.8,
        }}
      >
        <Heading level={3}>Leaderboard</Heading>
        <DataTable
          data={leaderboardData.map((user) => {
            return {
              name: user.name,
              totalTimeSpent: user.totalTimeSpent,
            };
          })}
          columns={[
            {
              property: "name",
              header: <Text>Name</Text>,
              primary: true,
            },
            {
              property: "totalTimeSpent",
              header: <Text>Total Time Spent</Text>,
            },
          ]}
        />
      </Box>
    </Grid>
  );
};

export default Dashboard;
