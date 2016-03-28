/* global google, SENSORS, SPEED */

var sensorsArrayTableCPUT = [['Time', 'CPU temp']];
var sensorsArrayTablePing = [['Time', 'Ping']];
var SpeedArrayTable = [['Time', 'Speed']];

function drawSensors() {
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
  graphcput.draw(datacput, optionscput);
  graphping.draw(dataping, optionsping);
}

function drawSpeed() {
  // --------SPEED---------
  var dataSpeed = google.visualization.arrayToDataTable(SpeedArrayTable);
  var optionsSpeed = {
    title: 'Speed (KB/s)',
    curveType: 'function',
    legend: { position: 'bottom' },
  };
  var graphSpeed = new google.visualization.LineChart(document.getElementById('graph_speed'));

  // --------DRAWING---------
  graphSpeed.draw(dataSpeed, optionsSpeed);
}

if ((SENSORS.length > 0) || (SPEED.length > 0)) {
  google.charts.load('current', { packages: ['corechart'] });
}

if (SENSORS.length > 0) {
  SENSORS.forEach(function pushSensors(values) {
    sensorsArrayTableCPUT.push([values.date, parseFloat(values.cputemp.replace('\'C', ''))]);
    sensorsArrayTablePing.push([values.date, parseFloat(values.pingtime.replace(' ms', ''))]);
  });

  google.charts.setOnLoadCallback(drawSensors);
}

if (SPEED.length > 0) {
  SPEED.forEach(function pushSpeed(values) {
    SpeedArrayTable.push([values.date, parseFloat(values.value)]);
  });

  google.charts.setOnLoadCallback(drawSpeed);
}
