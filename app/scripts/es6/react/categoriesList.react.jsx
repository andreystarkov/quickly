var CategoriesListStore = require('./stores/categoriesListStore.js');
var CategoresListActions = require('./actions/categoriesListActions.js');
var MenuItemsActions = require('./actions/menuItemsActions.js');


var CategoryItem = React.createClass({
	categoryToggle: function(el){
		var newId = this.props.item.category_id;
        var the = el.target;
        var others = document.getElementsByClassName('category-toggle');
		MenuItemsActions.updateData(newId);
        if(isMobile){
              $('#sidebar').removeClass('active');
              $('#sidebar').addClass('mobile');
        }
	},
	render: function(){
		var item = this.props.item;
		return (
		<li className="category-line">
    		<button onClick={this.categoryToggle} className="category-toggle">
            <i className="icon"></i>{item.category_name}
            </button>
        </li>
		)
	}
});

var CategoriesList = React.createClass({
    mixins: [Reflux.connect(CategoriesListStore, 'categories')],
    getInitialState: function() {
      return {
        data: [],
        categories: []
      };
    },
    loadAll: function(){
        console.log('CategoriesList: loadAll: ', this.props.company);
        if(this.props.company) MenuItemsActions.updateDataById(this.props.company);
    },
    render: function() {
        var list = this.state.categories;

        var everything = list.map(function(the, i) {
            return <CategoryItem item={the} key={i} />
        });
        return (
            <div className="categories-list">
            	<ul className="menu">
                    <li className="category-line">
                        <button onClick={this.loadAll} className="category-toggle active">
                            <i className="icon"></i>
                            <span>Все категории</span>
                        </button>
                    </li>
            	   {everything}
            	</ul>
            </div>
        )
    }
});

module.exports = CategoriesList;
