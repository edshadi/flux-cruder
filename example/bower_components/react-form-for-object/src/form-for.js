(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Input = require('./input.react');
var FormErrors = require('./form-errors.react');
module.exports = FormFor = React.createClass({displayName: 'FormFor',
  render: function() {
    if(Object.keys(this.props.object).length === 0) return(React.createElement("div", null));
    return (
      React.createElement("form", {onSubmit: this.handleSubmit, className: "form-for"}, 
        React.createElement(FormErrors, {errors: this.props.errors}), 
        this.inputs(), 
        React.createElement("input", {type: "submit", value: this.submitText(), className: "btn btn-default"}), 
      this.renderCancelButton()
      )
    );
  },
  inputs: function() {
    var object = this.props.object;
    var inputs = [];
    Object.keys(object).forEach(function(key, i) {
      var value = object[key];
      var dataForInput = {value: value, name: key}
      var options = this.options()[key] || {};
      inputs.push(React.createElement(Input, {key: key, ref: key, data: dataForInput, options: options, label: this.options().labels}));
    }.bind(this));
    return inputs;
  },
  options: function() {
    return this.props.options || {};
  },
  submitText: function() {
    var submit = this.options().submit;
    if(submit && submit.value) return submit.value
    submit = this.props.object.id ? 'Update' : 'Create';
    if(this.options().objectName) submit = submit + ' ' + this.options().objectName;
    return submit;
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var submitHandler = this.options().onSubmit
    if(submitHandler) {
      var data = {};
      Object.keys(this.refs).forEach(function(ref) {
        var value = this.getInputValue(ref);
        data[ref] = value;
      }.bind(this));
      submitHandler(data, {clearInputs: this.clearInputs});
    } else {
      console.log("You must pass an onSubmit function in your options.");
    }
  },
  renderCancelButton: function() {
    if(!this.options().onCancel) return;
    return(React.createElement("input", {type: "button", value: "Cancel", onClick: this.handleCancel}));
  },
  handleCancel: function() {
    this.clearInputs();
    this.options().onCancel();
  },
  getInputValue: function(ref) {
    // find the ref component
    // find the refs of the found component
    // find the input ref from the found component
    // get the getDOMNode and the value
    if(this.refs[ref] && this.refs[ref].refs && this.refs[ref].refs.input && this.refs[ref].refs.input.getDOMNode) {
      var input = this.refs[ref].refs.input.getDOMNode();
      if(input.type === "checkbox") return input.checked;
      return input.value;
    }
  },
  // Utility function to clear inputs.
  clearInputs: function() {
    Object.keys(this.refs).forEach(function(ref) {
      if(this.refs[ref] && this.refs[ref].refs && this.refs[ref].refs.input && this.refs[ref].refs.input.getDOMNode) {
        this.refs[ref].refs.input.getDOMNode().value = "";
      }
    }.bind(this));
  }

});

},{"./form-errors.react":7,"./input.react":9}],2:[function(require,module,exports){
var CheckboxInput = React.createClass({displayName: 'CheckboxInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "checkbox", defaultChecked: data.defaultChecked, className: data.className, value: data.value})
    );
  }

});

module.exports = CheckboxInput;

},{}],3:[function(require,module,exports){
var ColorInput = React.createClass({displayName: 'ColorInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, name: data.name, type: "color", defaultValue: data.defaultValue, className: data.className})
    );
  }

});

module.exports = ColorInput;

},{}],4:[function(require,module,exports){
var DateInput = React.createClass({displayName: 'DateInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "date", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = DateInput;

},{}],5:[function(require,module,exports){
var DatetimeInput = React.createClass({displayName: 'DatetimeInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "datetime-local", defaultValue: data.defaultValue, className: data.className})
    );
  }

});

module.exports = DatetimeInput;

},{}],6:[function(require,module,exports){
var EmailInput = React.createClass({displayName: 'EmailInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "email", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = EmailInput;

},{}],7:[function(require,module,exports){
var FormErrors = React.createClass({displayName: 'FormErrors',
  render: function() {
    var errors = [];
    this.props.errors.forEach(function(err) {
      errors.push(React.createElement("li", null, err))
    })
    return (
      React.createElement("ul", {className: "form-errors"}, errors)
    );
  }
});

module.exports = FormErrors;

},{}],8:[function(require,module,exports){
var HiddenInput = React.createClass({displayName: 'HiddenInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "hidden", value: data.value, className: data.className})
    );
  }

});
module.exports = HiddenInput;

},{}],9:[function(require,module,exports){
var TextInput = require('./text-input.react');
var CheckboxInput = require('./checkbox-input.react');
var NumberInput = require('./number-input.react');
var HiddenInput = require('./hidden-input.react');
var SelectInput = require('./select-input.react');
var PasswordInput = require('./password-input.react');
var TextareaInput = require('./textarea-input.react');
var DateInput = require('./date-input.react');
var ColorInput = require('./color-input.react');
var DatetimeInput = require('./datetime-input.react');
var EmailInput = require('./email-input.react');
var TimeInput = require('./time-input.react');
var Label = require('./label.react');

var Input = React.createClass({displayName: 'Input',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "form-group"}, 
          this.label(), 
          this.input()
        )
      )
    );
  },
  label: function() {
    if(!this.props.label) return;
    return(React.createElement(Label, {label: this.placeholder()}))
  },
  input: function() {
    var data = this.props.data;
    switch(this.type()) {
      case 'boolean':
        return(React.createElement("span", null, React.createElement(CheckboxInput, {ref: "input", data: {name: data.name, defaultChecked: data.value, className: this.props.options.className, value: data.value}}), React.createElement("span", null, this.placeholder())))
        break;
      case 'number':
        return(React.createElement(NumberInput, {ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'color':
        return(React.createElement(ColorInput, {ref: "input", data: {name: data.name, defaultValue: data.value, className: this.props.options.className}}))
        break;
      case 'email':
        return(React.createElement(EmailInput, {ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'date':
        return(React.createElement(DateInput, {ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'datetime':
        return(React.createElement(DatetimeInput, {ref: "input", data: {name: data.name, defaultValue: data.value, className: this.props.options.className}}))
        break;
      case 'time':
        return(React.createElement(TimeInput, {ref: "input", data: {name: data.name, defaultValue: data.value, className: this.props.options.className}}))
        break;
      case 'hidden':
        return(React.createElement(HiddenInput, {ref: "input", data: {name: data.name, value: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'select':
        return(React.createElement(SelectInput, {ref: "input", data: {name: data.name, value: data.value, values: this.props.options.values , className: this.props.options.className}}))
        break;
      case 'password':
        return(React.createElement(PasswordInput, {ref: "input", data: {name: data.name, defaultChecked: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      case 'textarea':
        return(React.createElement(TextareaInput, {ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
        break;
      default:
        return(React.createElement(TextInput, {ref: "input", data: {name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}}))
    }

  },
  type: function() {
    var type = typeof(this.props.data.value);
    if(this.props.options.type) type = this.props.options.type;
    if(this.isId()) type = 'hidden';
    if(this.isPassword()) type = 'password';
    if(this.isEmail()) type = 'email';
    return type;
  },
  isId: function() {
    if(this.props.data.name === 'id') return true;
    return false;
  },
  isPassword: function() {
    if(this.props.data.name === 'password' || this.props.data.name === 'password_confirmation') return true;
    return false;
  },
  isEmail: function() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(this.props.data.name === 'email' || re.test(this.props.data.value)) return true;
    return false;
  },
  placeholder: function() {
    var name = this.props.options.placeholder || this.props.data.name;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
});

module.exports = Input;

},{"./checkbox-input.react":2,"./color-input.react":3,"./date-input.react":4,"./datetime-input.react":5,"./email-input.react":6,"./hidden-input.react":8,"./label.react":10,"./number-input.react":11,"./password-input.react":13,"./select-input.react":14,"./text-input.react":15,"./textarea-input.react":16,"./time-input.react":17}],10:[function(require,module,exports){
var Label = React.createClass({displayName: 'Label',
  render: function() {
    return (
      React.createElement("label", {className: "form-for-label"}, this.props.label)
    );
  }

});

module.exports = Label;

},{}],11:[function(require,module,exports){
var NumberInput = React.createClass({displayName: 'NumberInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "number", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = NumberInput;

},{}],12:[function(require,module,exports){
var OptionForSelect = React.createClass({displayName: 'OptionForSelect',

  render: function() {
    return (
      React.createElement("option", {value: this.props.value}, this.props.show)
    );
  }

});
module.exports = OptionForSelect;

},{}],13:[function(require,module,exports){
var PasswordInput = React.createClass({displayName: 'PasswordInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "password", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = PasswordInput;

},{}],14:[function(require,module,exports){
var OptionForSelect = require('./options-for-select.react')
var SelectInput = React.createClass({displayName: 'SelectInput',
  render: function() {
    var data = this.props.data;
    var options = [];
    data.values.forEach(function(value) {
      options.push(React.createElement(OptionForSelect, {key: value.value, value: value.value, show: value.show}))
    }.bind(this))
    return (
      React.createElement("select", {ref: data.name, defaultValue: data.value, className: data.className, id: data.id}, 
        options
      )
    );
  }

});
module.exports = SelectInput;

},{"./options-for-select.react":12}],15:[function(require,module,exports){
var TextInput = React.createClass({displayName: 'TextInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "text", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = TextInput;

},{}],16:[function(require,module,exports){
var TextareaInput = React.createClass({displayName: 'TextareaInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("textarea", {ref: data.name, defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});
module.exports = TextareaInput;

},{}],17:[function(require,module,exports){
var TimeInput = React.createClass({displayName: 'TimeInput',
  render: function() {
    var data = this.props.data;
    return (
      React.createElement("input", {ref: data.name, type: "time", defaultValue: data.defaultValue, placeholder: data.placeholder, className: data.className})
    );
  }

});

module.exports = TimeInput;

},{}]},{},[1]);
