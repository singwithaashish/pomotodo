import TaskPage from '@/components/tasks/TaskPage'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import React from 'react'

function tasks() {
  return (
    <TaskPage/>
  )
}

export default tasks