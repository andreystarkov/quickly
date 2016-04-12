var ReservationActions = require('../actions/reservationActions.js');
var ReservationHallsStore = require('../stores/reservationHallsStore.js');
var ReservationTablesStore = require('../stores/reservationTablesStore.js');

import {getReservationPointsList} from '../../reservation.jsx';

function getReservationUnixTime(e){
    var theTime = $('#reservationTimePicker').val();
    var dateTime = $('#reservationDatePicker').val()+' '+$('#reservationTimePicker').val();
    var unixTime = moment(dateTime, 'DD-MM-YYYY HH:mm').zone(350).unix();

    console.log('getReservationUnixTime: dateTime = ',dateTime);
    console.log('getReservationUnixTime: UNIX Timestamp = ', unixTime);
    return unixTime;
}

var HallButton = React.createClass({
	hallHandle: function(e){
		var hallId = this.props.hall.hall_id;
		getReservationPointsList(hallId, 1513073410, function(data){
			console.log('rSDASDSADAS ', data);
		});
		ReservationActions.updateTable(hallId, 1513073410);
		console.log('Selecting hall: ', hallId,e);
	},
	render: function(){
		return (
			<button onClick={this.hallHandle} className="btn button light">{this.props.hall.hall_name}</button>
		)
	}
});

var Reservation = React.createClass({
  mixins: [
  	Reflux.connect(ReservationHallsStore, 'hallsList'),
  	Reflux.connect(ReservationTablesStore, 'tablesList')
  ],
  getInitialState: function() {
    return {
      hallsList: [],
      tablesList: []
    }
  },
   componentDidMount: function(){
  	 $('#reservation-datetime').datetimepicker({
        inline: true,
        locale: moment.locale('ru'),
        icons: {
            time: 'picker-time glyphicon glyphicon-time',
            date: 'glyphicon glyphicon-calendar',
            up: 'glyphicon glyphicon-chevron-up',
            down: 'glyphicon glyphicon-chevron-down',
            previous: 'glyphicon glyphicon-chevron-left',
            next: 'glyphicon glyphicon-chevron-right',
            today: 'glyphicon glyphicon-screenshot',
            clear: 'glyphicon glyphicon-trash',
            close: 'glyphicon glyphicon-remove'
        }
    });
  },
  render: function(){
		var halls = this.state.hallsList.map(function(the, i) {
		  return <HallButton hall={the} key={i} />
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
                 <div className="form-group">
                     <label htmlFor="reservationTimePicker" className="control-label">Время бронирования</label>
                     <input type='text' className="form-control" id='reservationTimePicker' />
                 </div>

                 <div className="form-group">
                     <label htmlFor="reservationDatePicker" className="control-label">Дата бронирования</label>
                     <input type='text' className="form-control" id='reservationDatePicker' />
                 </div>
             </div>
         </div>
     </div>
  	)
  }
});


module.exports = Reservation;
