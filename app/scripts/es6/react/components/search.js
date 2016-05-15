
var SearchStore = require('../stores/searchStore.js');
var SearchActions = require('../actions/searchActions.js');
var SearchResults = require('./searchResults.js')

function hideSearch(){
	$('#search-results-fixed').velocity('transition.slideUpOut',200);
	$('.overlay').removeClass('visible overlay-search');
	$("body").css({ overflow: 'inherit' })
}

function showSearch(){
	$('#search-results-fixed').velocity('transition.slideDownIn',350);
	$('.overlay').addClass('visible overlay-search');
	$("body").css({ overflow: 'hidden' })
}

var Search = React.createClass({
    mixins: [Reflux.connect(SearchStore, 'searchData')],
    getInitialState: function() {
      return {
      	searchData: [],
      	text: '',
      	restaurantType: 3,
      	visible: false
      };
    },
    componentDidMount: function(e){
    	$(document).on('click', '.overlay-search', function(event){
    		hideSearch();
    	});
    },
	doQuery: function(e){
		var this_ = this;
		e.preventDefault();
		if(this.state.text){
			var params = {
			    text: this.state.text,
			    restaurantType: this.state.restaurantType
			};
			SearchActions.fetchList(params, function(data){
				if(data.menuItems.length > 0) {
					this_.setState({ visible: true });
				} else toastr.error('По данному запросу нет результатов.', 'Ничего не найдено')

			});
		}
	},
	componentDidUpdate: function(){
		if(this.state.visible) {
			showSearch()
		} else {
			hideSearch();
		}
	},
	queryChange: function(e){
        this.setState({ text: e.target.value });
	},
	typeChange: function(e){
        this.setState({ restaurantType: e.target.value });
	},
	collapse: function(e){
		e.preventDefault();
        this.setState({ visible: false, text: '' });
	},
	render: function(){
		return (
			<div className="search-global">
		        <div className="form-search" id="form-search-top">
		            <div className="row">
		                <div className="col-lg-7 col-xs-6">
							<div class="form-group form-auth label-floating is-empty">
								<label htmlFor="input-search-top" className="control-label">Поиск</label>
								<input onChange={this.queryChange} value={this.state.text}  type="text" className="form-control input-search-top pop" id="input-search-top" />
							</div>
		                </div>
		                <div className="col-lg-2 col-xs-4">
		                	<div className="form-group">
		                		<b className="input-label">Искать в</b>
			                	<select id="search-type-select" onChange={this.typeChange} value={this.state.restaurantType}className="form-control">
			                    	<option value="1">Доставка</option>
			                    	<option value="2">Бронирование</option>
			                    	<option value="3">Везде</option>
	          					</select>
          					</div>
		                </div>
		                <div className="col-lg-2 col-xs-4">
		                	<div className="form-group">
			                    <button onClick={this.doQuery} id="button-search-top" className="btn btn-round-md btn-default btn-fab">
			                         <i className="material-icons icon-magnifier" />
			                    </button>
		                    </div>
		                </div>
		            </div>
		        </div>
		        <div className="search-results-fixed" id="search-results-fixed">
		        	<div className="scroll-box">
		        		<div className="scroll-wrap">
				        	<SearchResults data={this.state.searchData} />
				        	</div>
				        	<div className="btn-close-wrap">
				        		<button onClick={this.collapse} id="btn-search-close" className="btn-search-close btn btn-default btn-fab">
				        		<i className="material-icons icon-arrow-up"></i>
				        		</button>
				        	</div>
				        </div>
		        </div>
	        </div>
		)
	}
});

module.exports = Search;