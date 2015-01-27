/**
 * @jsx React.DOM
 */
var React = require('React');
var ObjForm = require('./obj-form');
var ObjStore = require('../stores/obj-store');
var Obj = React.createClass({
  getInitialState: function() {
    return {
      editing: false
    };
  },
  componentDidMount: function() {
    ObjStore.addChangeEvent(function(data) {
      if(this.isMounted()) this.setState({ editing: false });
    }.bind(this))
  },
  render: function() {
    return (
      <div className="obj">
        {this.state.editing ? this.renderForm() : this.renderObj()}
        <span><a href="#" onClick={this.editObj}>Edit</a></span>
        <span><a href="#" onClick={this.deleteObj}>Delete</a></span>
      </div>
    );
  },
  renderObj: function() {
    return(<div className='obj-item'>{this.props.obj.title}</div>);
  },
  renderForm: function() {
    var options = {
      onSubmit: this.props.handleEdit
    };
    return(<ObjForm object={this.props.obj} options={options} errors={this.props.errors} />);
  },
  editObj: function() {
    if(this.isMounted()) this.setState({ editing: true });
  },
  deleteObj: function() {
    this.props.handleDelete(this.props.obj.id);
  }

});

module.exports = Obj;
