import TaskPage from '@/components/tasks/TaskPage'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Box } from 'grommet'
import React from 'react'

function tasks() {
  return (
    <Box style={{
      minHeight: "100vh",
    }}>
    <TaskPage/>
    </Box>
  )
}

export default tasks