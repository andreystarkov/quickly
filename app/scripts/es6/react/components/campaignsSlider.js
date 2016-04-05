var CampaignsStore = require('../stores/campaignsStore.js');
var CampaignsActions = require('../actions/campaignsActions.js');
var CampaignsLimitedStore = require('../stores/CampaignsLimitedStore.js');

var SliderItem = React.createClass({
    render: function(){
        var className;
        if( this.props.pos == '0' ) className = "selected";
        return(
        <li className={className}>
            <div className="half-width">
                <h2>{this.props.title}</h2>
                <p>Постоянная акция</p>
                <a href="#0" className="button main">Подробнее об акции</a>
            </div>
            <div className="half-width img-container">
                <img src={imageBaseUrl+this.props.image} alt="..." />
            </div>
        </li>
        )
    }
});

var CampaignsSlider = React.createClass({
    mixins: [
        Reflux.connect(CampaignsStore, 'campaignsData'),
        Reflux.connect(CampaignsLimitedStore, 'campaignsLimitedData')
    ],
    getInitialState: function() {
      return {
        data: [],
        campaignsData: [],
        campaignsLimitedData: []
      };
    },
    render: function(){
        console.log('CampagainsSlider: ', this.state.campaignsData, this.state.campaignsLimitedData);
        var campaigns = this.state.campaignsData;
        var campaignsLimited = this.state.campaignsLimitedData;
        var count = 0;
        var slides = campaigns.map(function(the, i) {
            return <SliderItem title={the.campaign_name} image={the.campaign_image} pos={i} key={i} />
        });
        var slidesLimited = campaignsLimited.map(function(the, i) {
            return <SliderItem title={the.campaign_name} image={the.campaign_image} pos={i} key={i} />
        });
        console.log(slidesLimited);
        return (
            <section className="hero">
            <ul className="quickly-slider autoplay">
                {slides} {slidesLimited}
            </ul>
            <div className="slider-nav">
                <nav>
                    <span className="marker item-1"></span>
                    <ul>
                        <li className="selected">
                            <a href="#0"><i className="icon fi-dish"></i></a>
                        </li>
                        <li><a href="#0"><i className="icon fi-table"></i></a></li>
                        <li><a href="#0"><i className="icon fi-dish"></i></a></li>
                        <li><a href="#0"><i className="icon fi-table"></i></a></li>
                        <li><a href="#0"><i className="icon fi-dish"></i></a></li>
                    </ul>
                </nav>
            </div>
            </section>
        )
    }
});

module.exports = CampaignsSlider;
