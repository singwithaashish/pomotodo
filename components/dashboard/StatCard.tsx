import { Box, Header, Heading } from 'grommet';
import React from 'react'

interface StatCardProps {
    label: string;
    value: number;
}

function StatCard({label, value} : StatCardProps) {
  return (
    // <div>
    //     <h3>{label}</h3>
    //     <h1>{value}</h1>
    // </div>
    <Box direction="column" pad={"small"} align="center" gap="xsmall" round="small" background={
        {
          color: "#fff",
          // opacity: 0.8,
        }
    }>
        <Heading level={3} margin={{vertical: "xsmall"}}>{label}</Heading>
        <Heading level={1} margin={{vertical: "xsmall"}}>{value}</Heading>
    </Box>
  )
}

export default StatCard