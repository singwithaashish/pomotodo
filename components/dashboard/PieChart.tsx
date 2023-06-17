import { Meter } from "grommet";
import React from "react";
import { useAppState } from "../context/appStateContext";

function PieChart() {
  const { state, dispatch } = useAppState();
  return (
    <Meter
      // round={true}
      background="light-2"
      type="pie"
      values={[
        {
          value:
            (state.tasks.filter((task) => task.completed).length /
              state.tasks.length) *
            100,
          label: "sixty",
          onClick: () => {},
        },
      ]}
      aria-label="meter"
    />
  );
}

export default PieChart;
