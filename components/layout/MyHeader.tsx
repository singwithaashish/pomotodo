import { Box, Button, Header, Heading, Layer, Menu } from "grommet";
import { FC, useState } from "react";
import TaskForm from "../tasks/TaskForm";
import { useAppState } from "../context/appStateContext";

function MyHeader() {
    const [showTodoForm, setShowTodoForm] = useState(false);
    const {state, dispatch} = useAppState();
  return (
    <>
    <Header background="brand" style={state.isSessionActive ? {
      animation: "headerFadeUp 1s ease-in-out 1",
    } : {
      animation: "headerFadeDown 1s ease-in-out 1",
    }} >
      <Button hoverIndicator >
        <strong>Tomato</strong>
      </Button>
      <Button label="Add Todo" onClick={() => setShowTodoForm(true)} />
        <Menu label="account" items={[{ label: "logout" }]} />
    </Header>
      {
          (showTodoForm || state.editingTask?.title )
           &&  (
            <Layer
              onEsc={() => setShowTodoForm(false)}
              onClickOutside={() => setShowTodoForm(false)}
              style={{
               
                overflow: "auto",
              }}
            >
                <Box pad="medium" gap="small" width="medium">
                    <Heading level={3} margin="none">
                        Add Todo
                    </Heading>
                    <TaskForm  setShowTodoForm={setShowTodoForm}/>
                </Box>
            </Layer>
          )
        }
    </>
  );
}

export default MyHeader;
