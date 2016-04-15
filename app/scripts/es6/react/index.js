/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 21:20:53
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 06:38:04
*/
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');

const App = document.getElementById('App');

var Routes = require('./routes/routes.js');

ReactDOM.render(<Routes />, App);

