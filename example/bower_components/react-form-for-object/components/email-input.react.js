var EmailInput = React.createClass({
  render: function() {
    var data = this.props.data;
    return (
      <input ref={data.name} type="email" defaultValue={data.defaultValue} placeholder={data.placeholder} className={data.className} />
    );
  }

});

module.exports = EmailInput;
