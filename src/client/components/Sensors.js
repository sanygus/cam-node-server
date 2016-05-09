import React, { Component, PropTypes } from 'react';

import Subheader from 'material-ui/lib/Subheader';
import { Line as Chart } from 'react-chartjs';

export default class Sensors extends Component {
  render () {
    const { sensorsValues } = this.props;
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'CPU temp',
          fillColor: 'rgba(150, 150, 220, 0.2)',
          pointColor: 'rgba(50, 50, 130, 0.4)',
          data: [],
        },
        {
          label: 'Ping time',
          fillColor: 'rgba(150,220,150,0.2)',
          pointColor: 'rgba(50, 130, 50, 0.4)',
          data: [],
        },
      ]
    };
    sensorsValues.forEach( (value) => {
      chartData.labels.push(value.date);
      chartData.datasets[0].data.push(value.cputemp);
      chartData.datasets[1].data.push(value.pingtime);
    });

    return (
      <div>
        <Subheader>Sensors (chart-js)</Subheader>
        <Chart data={chartData} width='500' height='300' />
      </div>
    )
  }
}

Sensors.PropTypes = {
  sensorsValues: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}
