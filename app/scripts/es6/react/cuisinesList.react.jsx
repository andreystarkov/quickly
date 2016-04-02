var CuisinesStore = require('./stores/cuisinesStore.js');

var CuisinesList = React.createClass({
    mixins: [Reflux.connect(CuisinesStore, 'cuisinesData')],
    limit: 3,
    getInitialState: function() {
      return {
        data: [],
        cuisinesData: []
      };
    },
    componentDidMount: function() {

    },
    render: function() {
        var companyCuisines = JSON.parse(this.props.cuisines);
        var limit = this.limit;
        var allCuisines = getStorage('cuisines');

        var sorted = _.sortBy(allCuisines, function(o) { return o.cuisine_id; });

        console.log('CuisinesList: sorted = ', sorted);
        var totalList = companyCuisines.map(function(the, key) {
            if(key < limit){
                var pick = sorted[key+1];
                return (
                    <button className="button light button-cuisine" key={key}>{pick.cuisine_name}</button>
                )
            }
        });
        return (
            <div className="cuisinesList">
            {totalList}
            </div>
        )
    }
});

module.exports = CuisinesList;

