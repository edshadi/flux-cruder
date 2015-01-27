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

var Input = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <div>
        <div className="form-group">
          {this.label()}
          {this.input()}
        </div>
      </div>
    );
  },
  label: function() {
    if(!this.props.label) return;
    return(<Label label={this.placeholder()} />)
  },
  input: function() {
    var data = this.props.data;
    switch(this.type()) {
      case 'boolean':
        return(<span><CheckboxInput ref="input" data={{name: data.name, defaultChecked: data.value, className: this.props.options.className, value: data.value}} /><span>{this.placeholder()}</span></span>)
        break;
      case 'number':
        return(<NumberInput ref="input" data={{name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}} />)
        break;
      case 'color':
        return(<ColorInput ref="input" data={{name: data.name, defaultValue: data.value, className: this.props.options.className}} />)
        break;
      case 'email':
        return(<EmailInput ref="input" data={{name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}} />)
        break;
      case 'date':
        return(<DateInput ref="input" data={{name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}} />)
        break;
      case 'datetime':
        return(<DatetimeInput ref="input" data={{name: data.name, defaultValue: data.value, className: this.props.options.className}} />)
        break;
      case 'time':
        return(<TimeInput ref="input" data={{name: data.name, defaultValue: data.value, className: this.props.options.className}} />)
        break;
      case 'hidden':
        return(<HiddenInput ref="input" data={{name: data.name, value: data.value, placeholder: this.placeholder(), className: this.props.options.className}} />)
        break;
      case 'select':
        return(<SelectInput ref="input" data={{name: data.name, value: data.value, values: this.props.options.values , className: this.props.options.className}} />)
        break;
      case 'password':
        return(<PasswordInput ref="input" data={{name: data.name, defaultChecked: data.value, placeholder: this.placeholder(), className: this.props.options.className}} />)
        break;
      case 'textarea':
        return(<TextareaInput ref="input" data={{name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}} />)
        break;
      default:
        return(<TextInput ref="input" data={{name: data.name, defaultValue: data.value, placeholder: this.placeholder(), className: this.props.options.className}} />)
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
