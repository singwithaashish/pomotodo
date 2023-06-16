import { Meter } from "grommet";
import React from "react";

function PieChart() {
  return (
    <Meter  
    // round={true}
    background="light-2"
    type="pie"
      values={[
        {
          value: 60,
          label: "sixty",
          onClick: () => {},
        },
      ]}
      aria-label="meter"
    />
  );
}

export default PieChart;
