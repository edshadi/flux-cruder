var RadioInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} type="radio" className={data.className} />
    );
  }
})

module.exports = RadioInput;
