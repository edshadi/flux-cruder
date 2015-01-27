/**
 * @jsx React.DOM
 */
var React = require('React');
var Objs = require('./objs');
window.onload = function() {
  React.renderComponent(<Objs />, document.body);
}
