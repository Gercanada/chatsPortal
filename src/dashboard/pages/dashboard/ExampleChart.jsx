import { Paper } from '@mui/material';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { olimpicMedals as data } from './demo-data/data-virtualization';
import { useState } from 'react';

const Root = (props) => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = (props) => <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />;
/*   constructor(props) {
    super(props);

    this.state = {
      data,
    };
} */

export const ExampleChart = () => {
  const [state, setState] = useState(data);
  const { data: chartData } = state;
  return (
    <Paper>
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />

        <BarSeries name='Gold Medals' valueField='gold' argumentField='country' color='#a6ce39' />
        <BarSeries
          name='Silver Medals'
          valueField='silver'
          argumentField='country'
          color='#007ac3'
        />
        <BarSeries
          name='Bronze Medals'
          valueField='bronze'
          argumentField='country'
          color='#cd7f32'
        />
        <Animation />
        <Legend position='bottom' rootComponent={Root} labelComponent={Label} />
        <Title text='Earning Reports' />
        <Stack />
      </Chart>
    </Paper>
  );
};
