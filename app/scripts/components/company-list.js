// welcome to hell

var RestBox = React.createClass({
  loadRestList: function() {
    console.log('well..');
    $.ajax({
        url: this.props.url,
        data: {
            "restaurantType": 3
        },
        cache: false,
        dataType: 'json',
        type: "GET",
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
    console.log('it gets');
  },
  componentDidMount: function() {
    console.log('it mounts');
    this.loadRestList();
    setInterval(this.loadRestList, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="listBox">
        <h1>Test</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
  <CommenRestBox url="http://quickly.su/api/v2/restaurants/get" pollInterval={2000} />,
  document.getElementById('hellOnEarth')
);