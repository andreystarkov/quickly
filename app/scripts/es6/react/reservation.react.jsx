var ReservationStore = require('./stores/reservationStore.js');
var ReservationActions = require('./actions/reservationActions.js');

var HallsList = React.createClass({
		mixins: [Reflux.connect(ReservationStore, 'hallsData')],
		getInitalState: function(){
			return {
				hallsData: []
			}
		},
		render: function() {
	//		console.log('HallsList: ', this.state.hallsData);
			return(
				<div>sa</div>
			)
		}
});

var Reservation = React.createClass({
    mixins: [Reflux.connect(ReservationStore, 'cardsData')],
    bindUrl: serverUrl+'/api/v3/payments/cards/bind/'+userToken,
    getInitalState: function(){
        return {
            cardsData: []
        }
    },
    bindCard: function() {
      $.getJSON(this.bindUrl, function(data){
     //   console.log('CardsEditor bindCard', data.result);
        openNewTab(data.result);
      });
    },
    render: function () {
      //  console.log('CardsEditor: ',this.state.cardsData);
        return (
          <div className="cards-editor">
            <b className="group-title">Банковские карты</b>
            <div className="profile-cards">
              <div className="card-item">
                <i className="fi-card-detail"></i>
                <span className="number">
                  **** **** **** 1125
                </span>
              </div>
            </div>
            <button onClick={this.bindCard} className="button main">Добавить карту</button>
          </div>
        )
    }
});
