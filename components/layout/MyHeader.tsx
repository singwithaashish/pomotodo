import { Box, Button, Header, Heading, Layer, Menu, Text } from "grommet";
import { FC, useState } from "react";
import TaskForm from "../tasks/TaskForm";
import { useAppState } from "../context/appStateContext";
import Link from "next/link";

function MyHeader() {
  const [showTodoForm, setShowTodoForm] = useState(false);
  const { state, dispatch } = useAppState();
  return (
    <Header background="brand">
      <Link href={"/"}>

      <Button hoverIndicator>
        <Box pad="small">
          <Heading level="3" margin="none" color={"#fff"}>
            Lief Pomo
          </Heading>
        </Box>
      </Button>
      </Link>

      {/* <Menu label="account" items={[{ label: "logout" }]} /> */}
      <Box direction="row" gap="small" justify="center">
        <Stats
          label="Done"
          value={state.tasks.filter((task) => task.completed).length.toString()}
        />
        <Stats
          label="Tomatoes"
          value={state.tasks.map((task) => task.tomatoes).reduce((a, b) => a + b, 0).toString()}
        />
        <Stats
          label="Focus Time"
          value={state.tasks.map((task) => (task.timeSpent!)).reduce((a, b) => a + b, 0).toString() + " mins"}
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
