var Label = React.createClass({
  render: function() {
    return (
      <label className="form-for-label">{this.props.label}</label>
    );
  }

});

module.exports = Label;
