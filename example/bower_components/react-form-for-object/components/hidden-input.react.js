var HiddenInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} type="hidden" value={data.value} className={data.className} />
    );
  }

});
module.exports = HiddenInput;
