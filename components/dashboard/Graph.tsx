import { DataChart } from 'grommet';
import React from 'react'

export default function Graph() {
  const data = [{ date: '2020-08-20', amount: 2 }, { date: '2020-08-21', amount: 47 }, { date: '2020-08-22', amount: 33 }];
  return (
    <DataChart
      data={data}
      series={['date', 'amount']}
      chart={[
        { property: 'amount', type: 'line', opacity: 'medium', thickness: 'xsmall', round: true },
        { property: 'amount', type: 'point', point: 'star', thickness: 'medium' }
      ]}
    />
  );
}
