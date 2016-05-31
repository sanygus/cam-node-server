import React, { Component, PropTypes } from 'react';

import Subheader from 'material-ui/lib/Subheader';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { Line as Chart } from 'react-chartjs';

export default class Sensors extends Component {
  render () {
    const { sensorsValues } = this.props;
    const chartData = {
      labels: [],
      datasets: [
        {
          label: 'Power',
          fillColor: 'rgba(150,220,150,0.2)',
          pointColor: 'rgba(50, 130, 50, 0.4)',
          data: [],
        },
      ]
    };

    sensorsValues.powers.forEach( (value) => {
      //chartData.labels.push(value.date);
      chartData.datasets[0].data.push(value);
    });

    return (
      <div>
        <Subheader>Power</Subheader>
        <Chart data={chartData} width='1000' height='300' />
        <div style={{position: 'absolute', top: '20px', left: '270px'}}>
          <Subheader>Last values</Subheader>
          <div>
            <List>
              <ListItem primaryText={`CPU temp: ${sensorsValues.cputemp} 'C`} />
              <ListItem primaryText={`Voltage: ${sensorsValues.voltage} V`} />
              <ListItem primaryText={`Capacity: ${sensorsValues.capacity} Ah`} />
            </List>
          </div>
          <div style={{position: 'absolute', top: '48px', left: '170px', width: '200px'}}>
            <List>
              <ListItem primaryText={`Amperage: ${sensorsValues.amperage} A`} />
              <ListItem primaryText={`Power: ${sensorsValues.power} W`} />
              <ListItem primaryText={`date: ${sensorsValues.date}`} />
            </List>
          </div>
        </div>
      </div>
    )
  }
}

Sensors.PropTypes = {
  sensorsValues: PropTypes.object.isRequired,
}
