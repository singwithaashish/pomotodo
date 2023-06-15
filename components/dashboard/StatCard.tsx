import React from 'react'

interface StatCardProps {
    label: string;
    value: number;
}

function StatCard({label, value} : StatCardProps) {
  return (
    <div>
        <h3>{label}</h3>
        <h1>{value}</h1>
    </div>
  )
}

export default StatCard