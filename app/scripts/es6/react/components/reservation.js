import {getReservationPointsList} from '../../reservation.jsx';

moment.locale('ru');
moment.lang('ru');

var _ = require('underscore');
var ReservationActions = require('../actions/reservationActions.js');
var ReservationHallsStore = require('../stores/reservationHallsStore.js');
var ReservationTablesStore = require('../stores/reservationTablesStore.js');
var InputMoment = require('../ui/input-moment/src/input-moment.js');

function refreshTable(id, m){
    var unix = m.format('x');
    console.log('refreshTable: Unix Time: ', unix, m.format('DD:MM:YYYY hh:mm'));
    ReservationActions.updateTables(id, unix);
    console.log('refreshTable: Sent params: ', id, m, unix);
}

var HallButton = React.createClass({
	hallHandle: function(e){
       refreshTable(this.props.hall.hall_id, this.props.time);
	},
	render: function(){
        console.log('HallButton: ', this.props);
        var defaultClass = "btn button btn-select-hall btn-hl";
        var activeClass = " btn-raised", classNames;

        if ( this.props.active ) defaultClass += activeClass;

		return (
			<button value={this.props.value} onClick={this.props.onClick} className={defaultClass}>{this.props.hall.hall_name}</button>
		)
	}
});

var Option = React.createClass({
    render: function(){
        return (
            <option value={this.props.value}>{this.props.text}</option>
        )
    }
});


var SeatSelect = React.createClass({
    render: function(){
        var id=this.props.id;
        var wtf = [];

        for(var i=1; i<=this.props.count; i++){
            wtf[i] = i;
        }
        var options = wtf.map(function(the, i){
            return(
                <Option value={the} text={i} />
            )
        });
        console.log('SeatOptions: ', options);
        return(
            <div className="form-group label-static table-options-select">
                <label htmlFor={'tableOption-'+id} className="control-label">На сколько человек?</label>
                <select id={'tableOption-'+id} className="form-control">
                  {options}
                </select>
                <button className="button main round">Забронировать</button>
            </div>
        )
    }
});

var TablePoint = React.createClass({
    render: function(){
        var value, position, type, options = '';
        value = this.props.table;
        position = {
            left: value.table_coord_x-20,
            top: value.table_coord_y-20
        };

        if( value.table_type == 0 ) {
            var tableType = <div className="type">Беплатный</div>
        }

        if( value.table_type == 1 ) {
            var tableType = (
            <div>
                <div className="type">Платный</div>
                <div className="price">Стоимость заказа: <b>{value.table_price} <i className="rub" /></b></div>
            </div>
            )
        }

        if( value.table_type == 2 ) {
            var tableType = (
            <div>
                <div className="type">Депозитный</div>
                <div className="price">Сумма депозита: <b>{value.table_deposit} <i className="rub" /></b></div>
            </div>
            )
        }

        var classNames = "table";

        if(this.props.isReserved){
            classNames += " table-reserved";
        }
        console.log('Company: ', this.props.company);

        return (
            <div className={classNames}
                 id={'table-'+value.table_id}
                 style={position}
                 data-hall={value.hall_id} data-id={value.table_id}
                 data-reserved={this.props.isReserved}
                 data-seats={value.table_seats_count}
                 data-deposit={value.table_deposit}
                 data-price={value.table_price}
                 data-restaurant={this.props.company}
                >
                <div className="table-number">{value.table_number}</div>
                <div className="table-everything">
                    <div className="table-desc">
                        {type}
                        <span>Мест: {value.table_seats_count}</span>
                    </div>
                    <SeatSelect id={value.table_id} count={value.table_seats_count} />
                </div>
            </div>
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
      moment: moment().add(30, 'minutes'),
      currentHallId: 0
    }
  },
  componentDidMount: function(){
     ReservationActions.updateHalls(this.props.company);
  },
  componentDidUpdate: function(){
    var first, halls = this.state.hallsList.map(function(the, i) {
      if( i == 0 ) first = the;
      return the;
    });
    if(this.state.currentHallId == 0){
        console.log('Reservation DidUpdate: Current Hall Not Set; Selecting: ',first);
        if ( first ) {
            this.setState({
                currentHallId: first.hall_id
            });
        }
    } else {
        if( isEmptyObj(this.state.tablesList) ){
            ReservationActions.updateTables(this.state.currentHallId, this.state.moment.format('x') );
        }
    }
  },
  componentDidMount: function(){
    currentReservationTime = this.state.moment;
  },
  handleChange: function(e){
    console.log('New Date ', e);
    currentReservationTime = e;
    refreshTable(this.state.currentHall, e);
    this.setState({
        moment: e
    });
  },
  handleSave: function(e){
    console.log(e);
  },
  hallChange: function(e){
    ReservationActions.updateTables(e.target.value, this.state.moment.format('x'));
    this.setState({
        currentHallId: e.target.value
    });
  },
  render: function(){
    console.log('Reservation state: ', this.state, this.props);

    var that = this;
    var rId = 0;
    var tables, halls, currentHall, reservations;
    var currentHallImage, currentHallTables;
    var currentDate = this.state.moment;
    var currentHallId = this.state.currentHallId;

    if( !isEmptyObj(this.state.tablesList) ) {
        rId = that.state.tablesList.hall.restaurant_id;
        reservations = this.state.tablesList.reservations;
        currentHallTables = this.state.tablesList.tables;
        console.log('Got Tables: ',currentHallTables );
        tables = currentHallTables.map(function(the, i){
            var isReserved = false;
            if (reservations){
                isReserved = _.find(reservations, function(res,i){
                    if(the.table_id == res.table_id) {
                        console.log('Its reserved! ', the, res);
                        return true;
                    }
                });
            }
            return (
                <TablePoint company={rId} isReserved={isReserved} table={the} key={i} />
            )
        });
    }


    currentHall = _.find(this.state.hallsList, function(the){
        if(the.hall_id == that.state.currentHallId) return the;
    });

    if (currentHall) {
        currentHallId = currentHall.hall_id;
        currentHallImage = currentHall.hall_image;
    }

    halls = this.state.hallsList.map(function(the, i) {
        var isActive = false;
        if ( the.hall_id == currentHallId ) isActive = true;
        return <HallButton onClick={that.hallChange} value={the.hall_id} active={isActive} time={currentDate} hall={the} key={i} />
    });

  	return(
     <div className="container">
         <div className="row">
            <div className="col-lg-4">
                <h4>Выберите время</h4>
                <InputMoment
                  moment={this.state.moment}
                  onChange={this.handleChange}
                  onSave={this.handleSave}
                />
             </div>
             <div className="col-lg-8">
                 <div className="halls-box">
                 	{halls}
                 </div>
                 <div className="room-box">
                    <div className="the-room">
                        <div className="current-date">
                            <span>Состояние на {currentDate.format('DD/MM/YYYY HH:mm')}</span>
                        </div>
                        <img className="room-image" src={hallsUrl+currentHallImage} />
                        {tables}
                    </div>
                 </div>
             </div>
         </div>
     </div>
  	)
  }
});

module.exports = Reservation;
