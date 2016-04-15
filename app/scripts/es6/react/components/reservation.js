var ReservationActions = require('../actions/reservationActions.js');
var ReservationHallsStore = require('../stores/reservationHallsStore.js');
var ReservationTablesStore = require('../stores/reservationTablesStore.js');

import {getReservationPointsList} from '../../reservation.jsx';
//var InputMoment = require('input-moment');

moment.locale('ru');
moment.lang('ru');
var InputMoment = require('../ui/input-moment/src/input-moment.js');

function getReservationUnixTime(e){
    var theTime = $('#reservationTimePicker').val();
    var dateTime = $('#reservationDatePicker').val()+' '+$('#reservationTimePicker').val();
    var unixTime = moment(dateTime, 'DD-MM-YYYY HH:mm').zone(350).unix();

    console.log('getReservationUnixTime: dateTime = ',dateTime);
    console.log('getReservationUnixTime: UNIX Timestamp = ', unixTime);
    return unixTime;
}

function refreshTable(id, m){
    var unix = m.format('x');
    console.log('refreshTable: Unix Time: ', unix);
    getReservationPointsList(id, unix, function(data){
        console.log('refreshTable: callback ', data);
    });
    ReservationActions.updateTables(id, unix);
    console.log('refreshTable: Sent params: ', id, m, unix);
}

var HallButton = React.createClass({
	hallHandle: function(e){
       refreshTable(this.props.hall.hall_id, this.props.time);
	},
	render: function(){

        var defaultClass = "btn button btn-select-hall";
        var activeClass = " btn-raised", classNames;

        if ( this.props.active ) defaultClass += activeClass;

		return (
			<button onClick={this.hallHandle} className={defaultClass}>{this.props.hall.hall_name}</button>
		)
	}
});

var Reservation = React.createClass({
  mixins: [
  	Reflux.connect(ReservationHallsStore, 'hallsList'),
  	Reflux.connect(ReservationTablesStore, 'tablesList')
  ],
  halls: {},
  getInitialState: function() {
    return {
      hallsList: [],
      tablesList: [],
      moment: moment(),
      currentHall: 0
    }
  },
  componentDidUpdate: function(){
    var first;
    var halls = this.state.hallsList.map(function(the, i) {
      if( i == 0 ) first = the;
      return the;
    });
    console.log('Reservaiton DidUpdate: ',first,halls);
    if(this.state.currentHall == 0){
        console.log('Reservation DidUpdate: Current Hall Not Set; Selecting: ',first);
        if ( first ) refreshTable(first.hall_id, this.state.moment);
        this.setState({
            currentHall: first.hall_id
        });
    }
  },
  componentDidMount: function(){

  },
  handleChange: function(e){
    console.log('New Date ', e);
    this.setState({
        moment: e
    });
  },
  handleSave: function(e){
    console.log(e);
  },
  render: function(){
    var currentDate = this.state.moment,
        currentHall = this.state.tablesList,
        currentHallId = 0;

    if (currentHall.hall) currentHallId = currentHall.hall.hall_id;

	var halls = this.state.hallsList.map(function(the, i) {
      var isActive = false;
      if ( the.hall_id == currentHallId ) isActive = true;
      console.log(the.hall_id+' == '+currentHallId, isActive);
      return <HallButton active={isActive} time={currentDate} hall={the} key={i} />
	});

  	return(
     <div className="container">
         <div className="row">
             <div className="col-lg-8">
                 <div className="halls-box" id="hallsBox">
                 	{halls}
                 </div>
                 <div className="room-box" id="roomBox"></div>
             </div>
             <div className="col-lg-3">
                 <h3>Бронирование стола</h3>

                <InputMoment
                  moment={this.state.moment}
                  onChange={this.handleChange}
                  onSave={this.handleSave}
                />

             </div>
         </div>
     </div>
  	)
  }
});

module.exports = Reservation;
