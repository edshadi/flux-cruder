var TodoApp = new FluxCruder({
  baseUrl: '/todos',
  api: {
    // optional if you provide a RESTful baseUrl, we'll know what to do.
    // If your routes are not RESTful, then provide create, read, update, delete (CRUD) routes.
  },
  attributes: ['title', 'done'] // we give a store.new() method that returns an object representation of your resource.
});

var TodoActions = TodoApp.actions;
var TodoStore = TodoApp.store;

var TodoForm = React.createClass({displayName: "TodoForm",
  render: function() {
    return (
      React.createElement(FormFor, {object: this.props.object, options: this.props.options, errors: this.props.errors})
    );
  }

});

var Todo = React.createClass({displayName: "Todo",
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
      React.createElement("div", {className: "todo"}, 
        React.createElement("span", null, React.createElement("a", {href: "#", onClick: this.editTodo}, "Edit")), 
        React.createElement("span", null, React.createElement("a", {href: "#", onClick: this.deleteTodo}, "Delete")), 
        this.state.editing ? this.renderForm() : this.renderTodo()
      )
    );
  },
  renderTodo: function() {
    return(React.createElement("div", {className: "todo-item"}, this.props.todo.title));
  },
  renderForm: function() {
    var options = {
      onSubmit: this.props.handleEdit
    };
    return(React.createElement(TodoForm, {object: this.props.todo, options: options, errors: this.props.errors}));
  },
  editTodo: function() {
    if(this.isMounted()) this.setState({ editing: !this.state.editing });
  },
  deleteTodo: function() {
    this.props.handleDelete(this.props.todo.id);
  }

});

var Todos = React.createClass({displayName: "Todos",
  getInitialState: function() {
    return {
      todos: [],
      errors: []
    };
  },
  componentDidMount: function() {
    TodoStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ todos: TodoStore.collection() })
    }.bind(this));
    TodoStore.all();
  },
  render: function() {
    return (
      React.createElement("div", {className: "todos"}, 
      this.renderForm(), 
      this.renderTodos()
      )
    );
  },
  renderTodos: function() {
    var todos = [];
    this.state.todos.forEach(function(todo) {
      todos.push(React.createElement(Todo, {key: todo.id, todo: todo, errors: this.state.errors, handleEdit: this.handleEdit, handleDelete: this.handleDelete}));
    }.bind(this));
    return todos;
  },
  renderForm: function() {
    var object = TodoStore.new();
    var options = {
      onSubmit: this.handleSubmit
    };
    return(React.createElement(TodoForm, {object: object, options: options, errors: this.state.errors}));
  },
  handleSubmit: function(data) {
    TodoActions.create(data);
  },
  handleEdit: function(data) {
    TodoActions.update(data);
  },
  handleDelete: function(id) {
    TodoActions.destroy(id);
  }
});

window.onload = function() {
  React.render(React.createElement(Todos, null), document.body);
}
