/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 19:17:52
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-05-14 20:17:08
*/

var CompanyListSidebar = React.createClass({
    filterCardCourier: function(e){
       // console.log(e.target.value);
        if ( e.target.value == 'on' ){
            CompanyListActions.filterData(3);
        }
    },
    handleChange: function(e){

    },
    render: function(){
        $.material.init();

      //  console.log('CompanyListSidebar: init');
        return(
        <div className="sidebar-wrap company-list-sidebar">
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Бесплатная доставка</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Есть акции</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" onChange={this.filterCardCourier} name="somename" /> <span className="filter-name">Оплата картой курьеру</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Онлайн оплата</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Работает сейчас</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Рядом со мной</span></label>
            </div>
        </div>
        )
    }
});

module.exports = CompanyListSidebar;
