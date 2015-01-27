var ColorInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} name={data.name} type="color" defaultValue={data.defaultValue} className={data.className} />
    );
  }

});

module.exports = ColorInput;
