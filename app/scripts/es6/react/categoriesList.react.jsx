var CategoriesListStore = require('./stores/categoriesListStore.js');
var CategoresListActions = require('./actions/categoriesListActions.js');
var MenuItemsActions = require('./actions/menuItemsActions.js');

var CategoryItem = React.createClass({
	categoryToggle: function(el){
		var newId = this.props.item.category_id;
        var the = el.target;
        var others = document.getElementsByClassName('category-toggle');
		MenuItemsActions.updateData(newId);
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
    render: function() {
        var list = this.state.categories;

        var everything = list.map(function(the, i) {
            return <CategoryItem item={the} key={i} />
        });
        return (
            <div className="categories-list">
            	<ul className="menu">
            	{everything}
            	</ul>
            </div>
        )
    }
});

module.exports = CategoriesList;
