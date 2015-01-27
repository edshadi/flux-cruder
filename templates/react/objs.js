/**
 * @jsx React.DOM
 */
var React = require('React');
var Obj = require('./obj');
var ObjForm = require('./obj-form');
var ObjActions = require('../actions/obj-actions');
var ObjStore = require('../stores/obj-store');

var Objs = React.createClass({
  getInitialState: function() {
    return {
      objs: [],
      errors: []
    };
  },
  componentDidMount: function() {
    ObjStore.addChangeEvent(function() {
      if(this.isMounted()) this.setState({ objs: ObjStore.objs() })
    }.bind(this));
    ObjStore.all();
  },
  render: function() {
    return (
      <div className="objs">
        {this.renderForm()}
        {this.renderObjs()}
      </div>
    );
  },
  renderObjs: function() {
    var objs = [];
    this.state.objs.forEach(function(obj) {
      objs.push(<Obj key={obj.id} obj={obj} errors={this.state.errors} handleEdit={this.handleEdit} handleDelete={this.handleDelete} />);
    }.bind(this));
    return objs;
  },
  renderForm: function() {
    var object = ObjStore.new();
    var options = {
      onSubmit: this.handleSubmit
    };
    return(<ObjForm object={object} options={options} errors={this.state.errors} />);
  },
  handleSubmit: function(data) {
    ObjActions.createObj(data);
  },
  handleEdit: function(data) {
    ObjActions.updateObj(data);
  },
  handleDelete: function(id) {
    ObjActions.destroyObj(id);
  }
});

module.exports = Objs;
