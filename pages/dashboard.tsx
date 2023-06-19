import { useAppState } from "@/components/context/appStateContext";
import Graph from "@/components/dashboard/Graph";
import PieChart from "@/components/dashboard/PieChart";
import StatCard from "@/components/dashboard/StatCard";
import { DASHBOARD_DATA } from "@/components/data/gqlFetch";
import MyHeader from "@/components/layout/MyHeader";
import { Task } from "@/typings";
import { useMutation, useQuery } from "@apollo/client";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import { BarElement, CategoryScale, Chart, LinearScale } from "chart.js";
import exp from "constants";
import { Box, Button, DataTable, Grid, Header, Heading, Text } from "grommet";
import { BarChart, CaretLeftFill, FormPrevious, Previous } from "grommet-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement);
type UserWithTime = {
  // id: string;
  name: string | null;
  totalTimeSpent: number;
};

type DashboardDataType = {
  remainingTasks: Task[];
  timeSpentToday: number;
  timeSpentPastDays: number;
  tasksPerPriority: {
    priority: string;
    count: number;
  }[];
  timeSpentPerTask: {
    title: string;
    timeSpent: number;
    id: number;
  }[];
  averageTimeSpentPerTask: number;
};

type AllDashboardData = {
  leaderboardData: UserWithTime[];
  dashboardData: DashboardDataType;
};

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  const { state, dispatch } = useAppState();
  const { data, loading, error: err } = useQuery(DASHBOARD_DATA);

  // const [leaderboardData, setLeaderboardData] = useState<UserWithTime[]>([]);
  const [dashboardData, setDashboardData] = useState<
    AllDashboardData | undefined
  >();

  useEffect(() => {
    if (data) {
      console.log(data);
      // setLeaderboardData(data.dashboardData.leaderboardData);
      setDashboardData(data as AllDashboardData);
    }
  }, [data]);
  // Fetch tasks here and setTasks
  // const fetchTasks = async () => {
  //   const response = await fetch("/api/tasks");
  //   const data = await response.json();
  //   //   setTasks(data);
  //   dispatch({ type: "SET_TASKS", tasks: data });
  // };
  // fetchTasks();
  // getLeaderboardData();
  // }, []);

  // const getLeaderboardData = async () => {
  //   const response = await fetch("/api/tasks/dashboard", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data: UserWithTime[] = await response.json();
  //   // console.log(data);
  //   setLeaderboardData(data);
  // };

  if (isLoading) return <div>Loading...</div>;

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
      pad={{ horizontal: "medium" }}
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
        {dashboardData && (
          <Bar
            data={{
              labels: dashboardData.dashboardData.tasksPerPriority.map(
                (item) => item.priority
              ),
              datasets: [
                {
                  label: "Tasks per Priority",
                  data: dashboardData.dashboardData.tasksPerPriority.map(
                    (item: any) => item.count
                  ),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              // scales: {
              //   y: {
              //     beginAtZero: true,
              //   },
              // },
            }}
          />
        )}
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
        <Box direction="row" justify="between" align="center">
        <DataTable
          data={dashboardData?.leaderboardData.map((user) => {
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
        <Box justify="center" align="center" >
          <StatCard label="Total Tasks" value={state.tasks.length} />
        {/* </Box> */}
        {/* <Box justify="center" align="center"> */}
          <StatCard
            label="Total Tomatoes"
            value={state.tasks.reduce((acc, task) => acc + task.tomatoes, 0)}
          />
        </Box>

      </Box>
      </Box>
    </Grid>
  );
};

export default Dashboard;
