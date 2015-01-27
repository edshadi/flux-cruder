var React = require('React');
var Todos = require('./todos');
window.onload = function() {
  React.renderComponent(<Todos />, document.body);
}
