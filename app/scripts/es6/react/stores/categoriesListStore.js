var CategoriesListActions = require('../actions/categoriesListActions.js');
var MenuItemsActions = require('../actions/menuItemsActions.js');

var CategoriesListStore = Reflux.createStore({
    listenables: [CategoriesListActions],
    currentCompany:0,
    categories: [],
    sourceUrl: serverUrl+'/api/v2/categories/get/',
    init: function() {
      //something
    },
    updateData: function(companyId){
        this.currentCompany = companyId;
        console.log('CategoriesListStore: updateData: categoryId = '+companyId);
        this.fetchList();
    },
    fetchList: function() {
      var some = this;
      var url = this.sourceUrl+this.currentCompany;
      console.log('CategoriesListStore: fetchList: url = ', url);
      $.getJSON(url, function (data) {
        console.log('CategoriesListStore: fetchList: data = ', data);
        some.categories = data.result.categories;
        var firstCategory = some.categories[0];
        if( firstCategory ){
          console.log('CategoriesListStore: First Id = ', firstCategory.category_id);
        }

        some.trigger(some.categories);
      });
    }
});

module.exports = CategoriesListStore;
