import { Anchor, Box, Button, Header, Heading, Layer, Menu, Text } from "grommet";
import { FC, useState } from "react";
import TaskForm from "../tasks/TaskForm";
import { useAppState } from "../../context/appStateContext";
import Link from "next/link";

function MyHeader() {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const { state, dispatch } = useAppState();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <Header background="brand">
      <Box pad="small" direction="row" align="center" gap="small">
        <Link href={"/"} style={{ textDecoration: 'none' }}>
          <Heading level="3" margin="none" color={"#fff"}>
            Pomo Todo
          </Heading>
        </Link>
        <Link href={currentPath !== "/" ? "/" : "/dashboard"} style={{ textDecoration: 'none' }}>
          <Heading level={4}  style={{
            textDecoration: "none",
            textUnderlineOffset: "2rem",
            color: "#ccc",
            fontWeight: 600
          }}>
          {currentPath !== "/" ? "home" : "dashboard"}
          </Heading>
        </Link>
      </Box>

      {/* <Menu label="account" items={[{ label: "logout" }]} /> */}
      <Box direction="row" gap="small" justify="center">
        <Stats
          label="Done"
          value={state.tasks
            .filter((task) => task?.completed)
            .length.toString()}
        />
        <Stats
          label="Tomatoes"
          value={state.tasks
            .map((task) => task.tomatoes)
            .reduce((a, b) => a + b, 0)
            .toString()}
        />
        <Stats
          label="Focus Time"
          value={
            state.tasks
              .map((task) => task.timeSpent!)
              .reduce((a, b) => a + b, 0)
              .toString() + " mins"
          }
        />
      </Box>
    </Header>
  );
}

interface StatCardProps {
  label: string;
  value: string;
}

const Stats = ({ label, value }: StatCardProps) => {
  const { state, dispatch } = useAppState();
  return (
    <Box
      direction="column"
      pad="small"
      align="center"
      gap="xsmall"
      round="small"
    >
      <Text>{label}</Text>
      <Text weight="bold">{value}</Text>
    </Box>
  );
};

export default MyHeader;
