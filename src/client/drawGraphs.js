/* global google, SENSORS */

var sensorsArrayTableCPUT = [['Time', 'CPU temp']];
var sensorsArrayTablePing = [['Time', 'Ping']];

function draw() {
  // --------CPUT---------
  var datacput = google.visualization.arrayToDataTable(sensorsArrayTableCPUT);
  var optionscput = {
    title: 'CPU temperature',
    curveType: 'function',
    legend: { position: 'bottom' },
  };
  var graphcput = new google.visualization.LineChart(document.getElementById('graph_cput'));

  // --------PING---------
  var dataping = google.visualization.arrayToDataTable(sensorsArrayTablePing);
  var optionsping = {
    title: 'Ping time to 8.8.8.8',
    curveType: 'function',
    legend: { position: 'bottom' },
  };
  var graphping = new google.visualization.LineChart(document.getElementById('graph_ping'));

  // --------DRAWING---------
  graphping.draw(dataping, optionsping);
  graphcput.draw(datacput, optionscput);
}

if (SENSORS.length > 0) {
  SENSORS.forEach(function pushSensors(values) {
    sensorsArrayTableCPUT.push([values.date, parseFloat(values.cputemp.replace('\'C', ''))]);
    sensorsArrayTablePing.push([values.date, parseFloat(values.pingtime.replace(' ms', ''))]);
  });

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(draw);
}
