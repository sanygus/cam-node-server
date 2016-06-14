import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Line as Chart } from 'react-chartjs';
import Subheader from 'material-ui/lib/Subheader';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

class Sensors extends Component {
  render() {
    const { sensors, actions } = this.props;

    if (sensors.date) {
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Power',
            fillColor: 'rgba(150,220,150, 0.2)',
            pointColor: 'rgba(50, 130, 50, 0.4)',
            data: [],
          },
        ]
      };
      sensors.powers.forEach((value) => {
        chartData.datasets[0].data.push(value.power);
        chartData.labels.push(value.date);
      });
      return (
        <div>
          <Subheader>Power</Subheader>
          <Chart data={chartData} width='1000' height='300' />
          <div style={{position: 'absolute', top: '20px', left: '600px'}}>
            <Subheader>Last values</Subheader>
            <div>
              <List>
                <ListItem primaryText={`CPU temp: ${sensors.cputemp} 'C`} />
                <ListItem primaryText={`Voltage: ${sensors.voltage} V`} />
                <ListItem primaryText={`Capacity: ${sensors.capacity} Ah`} />
              </List>
            </div>
            <div style={{position: 'absolute', top: '48px', left: '170px', width: '250px'}}>
              <List>
                <ListItem primaryText={`Amperage: ${sensors.amperage} A`} />
                <ListItem primaryText={`Power: ${sensors.power} W`} />
                <ListItem primaryText={`date: ${sensors.date}`} />
              </List>
            </div>
          </div>
        </div>
      )
    } else {
      return (<div><Subheader>no sensors data</Subheader></div>)
    }

  }
}


Sensors.PropTypes = {
  sensors: PropTypes.shape({
    date: PropTypes.string.isRequired,
    cputemp: PropTypes.number.isRequired,
    voltage: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    amperage: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    ost: PropTypes.number.isRequired,
    powers: PropTypes.arrayOf(PropTypes.shape({
      power: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired
    })).isRequired,
  }).isRequired
}

export default connect(
  state => ({ sensors: state.sensors })
)(Sensors)