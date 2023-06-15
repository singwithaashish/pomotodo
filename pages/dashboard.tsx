import { useAppState } from "@/components/context/appStateContext";
import Graph from "@/components/dashboard/Graph";
import PieChart from "@/components/dashboard/PieChart";
import StatCard from "@/components/dashboard/StatCard";
import MyHeader from "@/components/layout/MyHeader";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { User } from "@prisma/client";
import exp from "constants";
import { Box, DataTable, Grid, Header } from "grommet";
import { useState } from "react";

const Dashboard = () => {
  const { user, error, isLoading } = useUser();
  const { state, dispatch } = useAppState();
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);

  return (
    <Grid
      areas={[
        { name: "header", start: [0, 0], end: [1, 0] },
        { name: "main", start: [0, 1], end: [1, 1] },
        { name: "sidebar", start: [1, 1], end: [1, 1] },
        { name: "footer", start: [0, 2], end: [1, 2] },
      ]}
      columns={["flex", "flex"]}
      rows={["xxsmall", "flex", "xxsmall"]}
      gap="small"
    >
      <Box gridArea="header">
        <MyHeader />
      </Box>
      <Box gridArea="main" overflow="auto">
        <PieChart />
        <Graph />
      </Box>
      <Box gridArea="sidebar" background="light-2">
        <StatCard label="Total Tasks" value={state.tasks.length} />
        <StatCard
          label="Total Tomatoes"
          value={state.tasks.reduce((acc, task) => acc + task.tomatoes, 0)}
        />
      </Box>
      <Box gridArea="footer">
        <DataTable data={leaderboardData} />
      </Box>
    </Grid>
  );
};

export default withPageAuthRequired(Dashboard);
