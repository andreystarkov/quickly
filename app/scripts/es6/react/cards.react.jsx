var CardsStore = require('./stores/cardsStore.js');
var CardsActions = require('./actions/cardsActions.js');

var CardsList = React.createClass({
    mixins: [Reflux.connect(CardsStore, 'cardsData')],
    getInitialState: function(){
      return {
        data: [],
        cardsData: []
      };
    },
    componentDidMount: function() {
     //   OrdersHistoryActions.updateData();
    },
    render: function() {
        console.log(this.state.cardsData);
        return (
            <div>
                test
            </div>
        )
    }
});

ReactDOM.render(<CardsList />, document.getElementById('cardsList'));
