'use strict';

const react = require('react');
const reactDOM = require('react-dom');
let abc = '123';

reactDOM.render(
  react.createElement('h1', null, 'HI'),
  document.getElementById('main')
);
