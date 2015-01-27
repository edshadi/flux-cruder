var React = require('React');
var TodoApp = require('../todo-app');
var TodoForm = require('./todo-form');
var TodoStore = TodoApp.store;

var Todo = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    TodoStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({ editing: false });
    }.bind(this))
  },
  render: function() {
    return (
      <div className="todo">
        <span><a href="#" onClick={this.editTodo}>Edit</a></span>
        <span><a href="#" onClick={this.deleteTodo}>Delete</a></span>
        {this.state.editing ? this.renderForm() : this.renderTodo()}
      </div>
    );
  },
  renderTodo: function() {
    return(<div className='todo-item'>{this.props.todo.title}</div>);
  },
  renderForm: function() {
    var options = {
      onSubmit: this.props.handleEdit
    };
    return(<TodoForm object={this.props.todo} options={options} errors={this.props.errors} />);
  },
  editTodo: function() {
    if(this.isMounted()) this.setState({ editing: !this.state.editing });
  },
  deleteTodo: function() {
    this.props.handleDelete(this.props.todo.id);
  }

});

module.exports = Todo;
