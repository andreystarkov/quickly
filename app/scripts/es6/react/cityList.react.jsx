import cookie from 'react-cookie';

var CityListActions = require('./actions/cityListActions.js');
var CityListStore = require('./stores/cityListStore.js');
var CompanyListActions = require('./actions/companyListActions.js');

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
        cityList: [],
        selected: 0,
        value: cookie.load('city') || 0
      };
    },
    componentWillMount(){
/*     city_.callback = (data) => {
        console.log('wtf!! ', data);
        this.setState({
          value: data
        });
      };*/
    },
    changeHandler: function(e) {
        console.log('CityList: change value = '+e.target.value);
        CompanyListActions.setCurrentCity(e.target.value);
        cookie.save('city', e.target.value);
        this.setState({
            value: e.target.value
        });
    },
    componentDidMount: function() {
      CompanyListActions.setCurrentCity(this.state.value);
      console.log('CityList: mount value = ', this.state.value);
    },
    render: function() {

      var selected = this.state.value;
      var this_ = this;
      var totalList = this.state.cityList.map(function(the, i) {
          return <Option name={the.city_name} value={the.city_id} key={i}/>
      });

      return (
      <div className="city-select">
        <div className="form-group">
          <b>Ваш город</b>
          <select id="cityListSelect" value={this.state.value} onChange={this.changeHandler} className="form-control">
            {totalList}
          </select>
        </div>
      </div>
      )
    }
});

module.exports = CityList;
