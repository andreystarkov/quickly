var CityListActions = require('./actions/cityListActions.js');
var CityListStore = require('./stores/cityListStore.js');

var Option = React.createClass({
  render: function(){
    return (
      <option value={this.props.value}>{this.props.name}</option>
    )
  }
});

var CityList = React.createClass({
    mixins: [Reflux.connect(CityListStore, 'cityList')],
    limit: 12,
    getInitialState: function() {
      return {
        data: [],
        cityList: []
      };
    },
    componentDidMount: function() {

    },
    render: function() {
      var totalList = this.state.cityList.map(function(the, i) {
          return <Option name={the.city_name} value={the.city_id} key={i} />
      });

      return (
      <div className="city-select">
        <div className="form-group">
          <b>Ваш город</b>
          <select id="cityListSelect" className="form-control">
            {totalList}
          </select>
        </div>
      </div>
      )
    }
});

module.exports = CityList;

ReactDOM.render(<CityList />, document.getElementById('selectCityField'));
