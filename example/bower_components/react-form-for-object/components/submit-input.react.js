var SubmitInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.value} type="submit" value={data.value} className={data.className} />
    );
  }

});

module.exports = SubmitInput;
